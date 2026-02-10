const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid");
const projectSchema = new mongoose.Schema({
     id: {
      type: String,
      default: uuidv4,
      unique: true,
      index: true,
    },
    name:{ type: String, required: true },
    clientName: { type: String, required: true },
    status: {
        type: String,
        enum: ['Active', 'on_hold', 'completed'],
        default: 'Active'
    },
    startDate: { type: Date },
    endDate: { type: Date },
   isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})


module.exports = mongoose.model("projects", projectSchema);


