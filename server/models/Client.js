const { Schema, model } = require('mongoose');

const clientSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        phone: {
            type: String,
            required: true,
            match: [/^\+?[1-9]\d{1,14}$/, 'Must use a valid phone number'],
        },
        inquiry: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const Client = model('Client', clientSchema);

module.exports = Client;