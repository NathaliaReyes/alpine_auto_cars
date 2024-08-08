const { User, Car, Client } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { DateResolver } = require('graphql-scalars');
const { passwordValidator } = require('../utils/helpers');

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
    cars: async (parent, args, context) => {
      const cars = await Car.find();
      if (!cars) {
        console.log("No cars found.");
      }
      return cars;
    },
    allClients: async (parent, args, context) => {
      try {
        const clients = await Client.find({});
        return clients;
      } catch (error) {
        console.error('Error getting clients:', error.message);
        throw new Error('Failed to get clients', error.message);
      }
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, _id }) => {
      try {
        // Validate the password
        if (!passwordValidator(password)) {
          throw new Error('Password must have at least one lowercase letter, one uppercase letter, one number, and one special character');
        }

        // Validate password length before hashing
        if (password.length < 8 || password.length > 12) {
          throw new Error('Password must be between 8 and 12 characters long');
        }

        // Create the user
        const user = await User.create({ username, email, password, _id });

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
        throw new Error('Failed to create user');
      }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Not logged in.');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials.');
      }
      const token = signToken(user);
      // console.log('resolvertoken', token);
      // console.log("logged in");
      return { token, user };
    },

    addCar: async (parent, args, context) => {
      // Ensure the user is authenticated (optional)
      // if (!context.user) throw new AuthenticationError('Not logged in.');

      try {
        const { make, model, year, stock, mileage, retail_price, asking_price, color, trim, engine, vin, transmission, description, engineType, driveTrain, vehicleType, images, fuelType } = args;
        // Process the image paths if necessary
        // const imagePaths = images.map(file => file.path.replace(/\\/g, '/'));

        const car = await Car.create({
          make,
          model,
          year,
          stock,
          mileage,
          retail_price,
          asking_price,
          color,
          trim,
          engine,
          vin,
          transmission,
          description,
          engineType,
          driveTrain,
          vehicleType,
          images,
          fuelType
        });

        console.log('Car created successfully...');
        return car;
      } catch (error) {
        console.error('Error creating car:', error.message);
        throw new Error('Failed to create car', error.message);
      }
    },

    updateCar: async (parent, { carData }) => {
      // if (context.user) {
      try {
        const { carId, ...updateFields } = carData;

        const updatedCar = await Car.findByIdAndUpdate(
          carId,
          { $set: updateFields },
          { new: true, runValidators: true }
        );

        if (!updatedCar) {
          throw new Error('No car found with this id!');
        }

        return updatedCar;
      } catch (error) {
        console.error('Error updating car:', error.message);
        throw new Error('Failed to update car');
      }
      // }
      // throw new AuthenticationError;
    },

    deleteCar: async (parent, { _id }) => {
      // if (context.user) {
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
      // }
      // throw new AuthenticationError('Not logged in.');
    },

    addClient: async (parent, { firstName, lastName, email, phone, inquiry, message, _id }) => {
      try {
        console.log('Get the try...');
        if (!firstName || !lastName || !email || !phone || !inquiry || !message) {
          throw new Error('Please fill out all fields');
        }
        const newClient = new Client({
          firstName,
          lastName,
          email,
          phone,
          inquiry,
          message,
          _id
        });
        await newClient.save();
        console.log('Client created successfully...');
        return newClient;
      } catch (error) {
        console.error('Error adding client:', error.message);
        throw new Error('Failed to add client', error.message);
      }
    },
  },
};

module.exports = resolvers;