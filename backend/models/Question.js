const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  content: String,
  marks: Number
});

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  question_text: {
    type: String,
    required: true
  },

  topic: {
    type: String,
    enum: ["Algebra", "Geometry"],
    required: true
  },

  level: {
    type: String,
    enum: ["Sec1", "Sec2", "Sec3", "Sec4"],
    required: true
  },

  model_answer: {
    final_answer: {
      type: String,
      required: true
    },

    steps: [stepSchema]
  },

  final_answer_marks: {
    type: Number,
    default: 0
  },

  total_marks: {
    type: Number,
    required: true
  },

  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  isPublished: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);