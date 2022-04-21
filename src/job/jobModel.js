const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  publicVisible: {
    type: Boolean,
    default: true,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    require: true,
  },
  contactDetails: {
    type: String,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    require: true,
  },
  messages: [
    {
      userId: String,
      title: String,
      text: String,
      read: Boolean,
      default: false,
    },
  ],
});

const JOB = mongoose.model("JOB", jobSchema);

module.exports = JOB;