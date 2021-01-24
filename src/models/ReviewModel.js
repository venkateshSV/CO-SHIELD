
const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ReviewDataSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        id: String,
        delivery: Number,
        customerSupport: Number,
        service: Number,
        vaccineSecurity: Number,
        recordUpdate: Number       
    });
var ReviewData = mongoose.model('ReviewData', ReviewDataSchema,'reviews');
module.exports = ReviewData;