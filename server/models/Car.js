const { Schema, model } = require('mongoose');
const { yearValidator } = require('../utils/helpers');

const carSchema = new Schema(
    {
        make: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
            validate: {
                validator: yearValidator,
                message: 'Please provide a valid year',
            },
        },
        stock: {
            type: Number,
        },
        mileage: {
            type: Number,
            required: true,
        },
        retail_price: {
            type: Number,
            required: true,
        },
        asking_price: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        trim: {
            type: String,
        },
        engine: {
            type: String,
            required: true,
        },
        vin : {
            type: String,
            required: true,
        },
        transmission: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            maxlength: 1000,
        },
        engineType: {
            type: String,
        },
        driveTrain: {
            type: String,
        },
        doors: {
            type: Number,
        },
        cabType:{
            type: String,
        },
        images: [
            {
                type: String,
            },
        ],
        created_at: {
            type: Date,
            default: Date.now,
        },
        updated_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        versionKey: false,
    }
);

carSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const Car = model('Car', carSchema);

module.exports = Car;