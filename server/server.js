require ('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');
const multer = require('multer');
const uuid = require("uuid").v4

const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { error } = require('console');
const { S3Uploadv2, S3Uploadv3 } = require('./s3Service');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: false,
  introspection: true, // Enables introspection in development mode
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })] // Enables the Apollo Sandbox
});

// const storage = multer.diskStorage({ 
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../client/dist/images'));
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// })

// const upload = multer({ storage });


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  const corsOptions = {
    origin: ['https://usa.alpineauto.xyz','http://localhost:5174' ], // Allow both development / Production
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Methods allowed
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true, // Allow the use of cookis and authorization headers
  };
  app.use(cors(corsOptions));

  // Apply Apollo Server middleware to the '/graphql' endpoint
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));
  console.log('Apollo Server middleware applied to /graphql');

  // }
  // Ruta para manejar la subida de archivos
  // app.post('/upload', upload.array('file'), (req, res) => {
  //   console.log('File received on server:', req.file); // Debugging
  //   if (!req.file) {
  //     return res.status(400).send({ message: 'No file uploaded' });
  //   }
  //   // Construct a URL for the image
  //   const imageUrl = `/images/${req.file.filename}`; // Only keep the relative path after "/images"
  //   res.send({ filePath: imageUrl });
  // });


  // custom filename
  // const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, path.join(__dirname, '../client/dist/images'));
  //   },
  //   filename: (req, file, cb) => {
  //     const { originalname } = file
  //     cb(null, `${uuid()}-${originalname}`);
  //   }
  // });

  const storage = multer.memoryStorage();

  // Check if the file is an image
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === 'image') {
      cb(null, true)
    } else {
      cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
  }

  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10000000000, files: 5 }  // 1MB limit the 6 ceros are bytes
  });

  app.post("/s3upload", upload.array("file"), async(req, res) => {
    console.log('Request received at /s3upload');
    try {
      console.log(req.files);
      const results = await S3Uploadv3(req.files);
      console.log("results: ", results);
      return res.json({ status: "success", results });
    }catch (error) {
      console.log(error);
      return res.status(500).json({ status: "error", message: "Error uploading files" });
    }
  });

  app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
      if(error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ 
          message: 'File size is too large. Max size is 1MB' 
        });
      }
      if(error.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({ 
          message: 'File limit reached. Max 5 files' 
        });
      }
      if(error.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ 
          message: 'File must be an image' 
        });
      }
    }
  });

  // app.use(express.static(path.join(__dirname, '../client/dist')));

  // app.use('/images', (req, res, next) => {
  //   console.log('Serving request for image:', req.path);
  //   next(); 
  // }, express.static(path.join(__dirname, '../client/dist/images')));

  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  // });

  db.once('open', () => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
}

// Call the async function to start the server
startApolloServer();
