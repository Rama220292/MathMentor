const express = require("express");
const router = express.Router();

const submissionController = require("../controllers/submissionController");

const verifyToken = require("../middleware/verifyToken");
const verifyRole = require("../middleware/verifyRole");

// Student Routes
router.post("/", verifyToken, verifyRole("student"), submissionController.createSubmission);
router.put("/:id", verifyToken, verifyRole("student"), submissionController.updateSubmission);

// Teacher Routes
router.put("/:id/review", verifyToken, verifyRole("teacher"), submissionController.reviewSubmission);

module.exports = router;