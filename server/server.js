const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors');
const multer = require('multer');

const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default');



const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: false,
  introspection: true, // Enables introspection in development mode
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })] // Enables the Apollo Sandbox
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../client/dist/images'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage });
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  const corsOptions = {
    origin: ['http://localhost:5174', 'https://usa.alpineauto.xyz'], // Permite solicitudes desde estos orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Permite estos métodos HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Permite estos encabezados
    credentials: true, // Permite el uso de cookies y encabezados de autorización
  };
  app.use(cors(corsOptions));

  // Apply Apollo Server middleware to the '/graphql' endpoint
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));
  console.log('Apollo Server middleware applied to /graphql');

// }
  // Ruta para manejar la subida de archivos
  app.post('/upload', upload.single('file'), (req, res) => {
    console.log('File received on server:', req.file); // Asegúrate de que req.file existe
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }
    // Construct a URL for the image
    const imageUrl = `/images/${req.file.filename}`; // Only keep the relative path after "/images"
    res.send({ filePath: imageUrl });
  });


app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/images', (req, res, next) => {
  console.log('Serving request for image:', req.path);
  next();
}, express.static(path.join(__dirname, '../client/dist/images')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

db.once('open', () => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
}

// Call the async function to start the server
startApolloServer();
