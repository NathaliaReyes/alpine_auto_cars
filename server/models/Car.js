const { Schema, model } = require('mongoose');

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
        },
        price: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        mileage: {
            type: Number,
            required: true,
        },
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
    }
);

carSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const Car = model('Car', carSchema);

module.exports = Car;