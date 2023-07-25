const checkAnswers = (testObj, userAnswersObj) => {
  const correctAnswersArr = testObj.map((answer) => answer.correctAnswer);
  const userAnswersArr = Object.values(userAnswersObj).map(
    (answer) => answer === "true"
  );

  let correctAnswersCount = 0;

  for (let i = 0; i < correctAnswersArr.length; i++) {
    correctAnswersArr[i] === userAnswersArr[i] && correctAnswersCount++;
  }

  return correctAnswersCount;
};

export default checkAnswers;
