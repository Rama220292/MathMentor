const gradeAnswer = (studentAnswer, question) => {
  let score = 0;
  let feedback = [];
  let stepResults = [];

  const model = question.model_answer;

  //  Check final answer
  if (studentAnswer.final_answer === model.final_answer) {
    score += question.final_answer_marks;

    feedback.push("Final answer is correct");

  } else {
    feedback.push("Final answer is incorrect");
  }

  //  Check steps (simple version)
  if (studentAnswer.steps && model.steps) {
    model.steps.forEach((modelStep, index) => {
      const studentStep = studentAnswer.steps[index];

      if (
        studentStep &&
        studentStep.content === modelStep.content
      ) {
        score += modelStep.marks;

        stepResults.push({
          step: modelStep.content,
          correct: true,
          marksAwarded: modelStep.marks
        });

      } else {
        stepResults.push({
          step: modelStep.content,
          correct: false,
          marksAwarded: 0
        });

        feedback.push(`Step ${index + 1} is incorrect`);
      }
    });
  }

  return {
    score,
    totalMarks: question.total_marks,
    feedback,
    stepResults
  };
};

module.exports = gradeAnswer;