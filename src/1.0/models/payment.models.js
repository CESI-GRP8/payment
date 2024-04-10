const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentModel = new Schema({
    commandNumber: {
        required: [true, "Type is a required field"],
        type: Number,
    },
    status: {
        retquired: [true, "Status is a required field"],
        type: String,
    }
})

module.exports = mongoose.model("Payment", paymentModel)