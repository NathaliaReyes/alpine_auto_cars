const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// set token secret and expiration date
const secret = process.env.AUTH_SECRET;
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // console.log(req);
    // console.log('Middleware hit');
    // console.log('Headers:', JSON.stringify(req.headers, null, 2));
    // console.log('Query:', JSON.stringify(req.query, null, 2));
    // console.log('Body:', JSON.stringify(req.body, null, 2));
    // console.log(req.body.variables);
    // console.log("req.headers.authorization");
    // allows token to be sent via req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    // console.log('Raw Token:', token);
    if (req.headers.authorization != null ) {
      token = token.split(' ').pop().trim();
    }


    // console.log('Processed Token:', token);
    // console.log('Token:', JSON.stringify(token, null, 2));
    if (!token) {
      // return { user: null };
      return req;
    }

    // console.log("Hello World", token);

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      // console.log(req.user);
      // console.log('Verified token data:', data);
      // return { user: data };

    } catch (error) {
      console.log('Invalid token:', error.message);
      // return { user: null };
    }
    // console.log("End of Auth middleware")
    return req;

  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    // console.log('Generated Token:', token); // Log generated token
    return token;
  },
};
