const mongoose = require("mongoose");

const marksBreakdownSchema = new mongoose.Schema({
  step_index: Number,
  marks_awarded: Number,
  feedback: String
});

const submissionSchema = new mongoose.Schema({

  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  },

  raw_input: {
    type: String,
    required: true
  },

  structured_answer: {
    final_answer: String,
    steps: [String]
  },

  ai_score: Number,
  ai_feedback: String,
  final_answer_correct: Boolean,

  marks_breakdown: [marksBreakdownSchema],

  review_status: {
    type: String,
    enum: ["pending", "reviewed"],
    default: "pending"
  },

  reviewed_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  teacher_score: Number,
  teacher_feedback: String,

  reviewedAt: Date,

  final_score: Number,
  final_feedback: String

}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);