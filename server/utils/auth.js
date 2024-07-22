const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// set token secret and expiration date
const secret = process.env.AUTH_SECRET;
// process.env.AUTH_SECRET;
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  // function for our authenticated routes
  authMiddleware: function ({ req }) {

    console.log("THIS IS THE REQ...: ", req);

    // allows token to be sent via req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization || req.headers['Authorization'];
    console.log("This is the token : ", token);
  
    if (req.headers.authorization != null) {
      token = token.split(' ').pop().trim();
    }
    console.log("This is the token after split : ", token);

    if (!token) {
      console.log('No token provided:');
      return req;
    }

    console.log('Token received: ', token);


    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      console.log('Data: ', data);

    } catch {
      console.log('Invalid token:');
    }

    return req;
  },
  signToken: function ({ username, email, password, _id }) {
    const payload = { username, email, password, _id };
    console.log('Payload: ', payload);
    const token = jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    console.log('SignToken: ', token);
    return token;
  },
};
