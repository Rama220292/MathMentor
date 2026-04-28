const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const verifyRole = require("../middleware/verifyRole");

const questionController = require("../controllers/questionController");

router.post("/", verifyToken, verifyRole("teacher"), questionController.createQuestion);
router.put("/:id", verifyToken, verifyRole("teacher"), questionController.updateQuestion);
router.delete("/:id", verifyToken, verifyRole("teacher"), questionController.deleteQuestion);
router.get("/", verifyToken, questionController.getQuestions);
router.get("/:id", verifyToken, questionController.getQuestionById);

module.exports = router;