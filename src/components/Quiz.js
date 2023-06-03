import React from "react";
const check = [
  {
    result: "Congratulations!",
    title: "You have passed the quiz!",
  },
  {
    result: "Sorry!",
    title: "You have failed the quiz!",
  },
];
const Quiz = () => {
  const [questions, setQuestions] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showScore, setShowScore] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=10");
        const data = await response.json();
        setQuestions(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  return (
    <div className="text-center mt-10">
      {showScore ? (
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Quiz Results</h2>
          <h3 className="text-xl">{check[score >= 5 ? 0 : 1].result}</h3>
          <p className="text-xl">{check[score >= 5 ? 0 : 1].title}</p>
          <p className="text-xl">
            You scored {score} out of {questions.length} questions correctly! 🎉
          </p>
          <button
            className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 mr-2 mb-2 rounded"
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowScore(false);
            }}
          >
            Start Again
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-semibold mb-4">
            Question {currentQuestion + 1}
          </h2>
          <h3 className="text-xl">{questions[currentQuestion]?.question}</h3>
          <div className="mt-5">
            {questions[currentQuestion]?.incorrect_answers
              .concat(questions[currentQuestion]?.correct_answer)
              .map((option) => (
                <button
                  key={option}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-6 px-8 mr-2 mb-2 rounded"
                  onClick={() => handleAnswerClick(option)}
                >
                  {option}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
