const { User, Car } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { DateResolver } = require('graphql-scalars');

const resolvers = {
  Date: DateResolver,
  Query: {
    me: async (parent, args, context) => {
      console.log(context.user);
      const foundUser = await User.findOne({ _id: context.user._id })

      if (!foundUser) {
        console.log("no found user");
      }
      console.log('User found', foundUser);
      return foundUser;
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password, _id }) => {
      try {
        // Create the user
        const user = await User.create({ username, email, password, _id});

        // Save the user
        await user.save();

        console.log('User created successfully...');

        // Generate token for the user
        const token = signToken(user);

        // Return token and user object
        return { token, user };
      } catch (error) {
        console.error('Error creating user:', error.message);
        // Handle error appropriately, maybe throw an error or return an error message
        throw new Error('Failed to create user', error.message);
      }
    },

    addCar: async (parent, { make, model, year, color, price, mileage, created_at, updated_at}) => {
      try {
        // Create the car
        const car = await Car.create({ make, model, year, color, price, mileage, created_at, updated_at });

        // Save the car
        await car.save();

        console.log('Car created successfully...');

        // Return the car object
        return car;
      } catch (error) {
        console.error('Error creating car:', error.message);
        // Handle error appropriately, maybe throw an error or return an error message
        throw new Error('Failed to create car', error.message);
      }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      console.log("logged in");
      return { token, user };
    },

    updateCar: async (parent, { _id, make, model, year, color, price, mileage, updated_at }) => {
      try {
        const car = await Car.findOneAndUpdate(
          { _id },
          { make, model, year, color, price, mileage, updated_at },
          { new: true }
        );

        if (!car) {
          throw new Error('No car found with this id!');
        }

        return car;
      } catch (error) {
        console.error('Error updating car:', error.message);
        throw new Error('Failed to update car', error.message);
      }
    },

    deleteCar: async (parent, { _id }) => {
      try {
        const car = await Car.findOneAndDelete({ _id });

        if (!car) {
          throw new Error('No car found with this id!');
        }

        return car;
      } catch (error) {
        console.error('Error deleting car:', error.message);
        throw new Error('Failed to delete car', error.message);
      }
    },
  }
};

module.exports = resolvers;