const mongoose = require("mongoose")
const Question = require("../models/Question");


// CREATE QUESTION (Teacher)
const createQuestion = async (req, res) => {
  try {
    const question = await Question.create({
      ...req.body,
      created_by: req.user.id // from JWT
    });

    res.status(201).json(question);

  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};


// GET ALL QUESTIONS
const getQuestions = async (req, res) => {
  try {
    const { topic, level } = req.query;

    let filter = { isPublished: true };

    if (topic) filter.topic = topic;
    if (level) filter.level = level;

    const questions = await Question.find(filter);

    res.json(questions);

  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};


// GET SINGLE QUESTION
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ err: "Question not found" });
    }

    res.json(question);

  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};


// UPDATE QUESTION (Teacher)
const updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ err: "Question not found" });
    }

    res.json(updatedQuestion);

  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};


// DELETE QUESTION (Teacher)
const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);

    if (!deletedQuestion) {
      return res.status(404).json({ err: "Question not found" });
    }

    res.json({ message: "Question deleted successfully" });

  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion }
