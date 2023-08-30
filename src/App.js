import React, {useState} from 'react';
import './App.css';
import Button from '@mui/material/Button';
import questions from "./questionData";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
      // 處理選擇答案的事件，將答案添加到 userAnswers 中，並呼叫 submitAnswer 和 handleNextQuestion 函數
      const handleAnswerSelect = (selectedOption) => {
        setUserAnswers([...userAnswers, selectedOption]);
        submitAnswer(selectedOption);
        handleNextQuestion();
      };
  
      // 處理下一題的事件，更新當前題目狀態
      const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          console.log('All answers submitted');
        }
      };
  
    // 處理提交答案的事件，將答案提交到後端處理（選擇題）
    const submitAnswer = async (selectedOption) => {
      try {
        const response = await fetch('https://fasiapi-python-a8fc75911008.herokuapp.com/submit-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answer: selectedOption }),
        });
  
        // 根據請求的響應處理結果
        if (response.ok) {
          console.log('Answer submitted successfully');
        } else {
          console.error('Error submitting answer');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  return (
    <div>
      <div className="background-layer"></div>
      <div className="quiz-container">
      {/* 判斷是否還有問題未作答 */}
      {currentQuestion < questions.length -1 ? (
        <div className="question-container">
          <h1>問題 {currentQuestion + 1}</h1>
          <p>{questions[currentQuestion].question}</p>
          <div className="options-container">
            {/* 渲染選項按鈕 */}
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={userAnswers[currentQuestion] === option ? 'selected' : ''}
                variant={"contained"}
                size="large"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        // 測驗完成後顯示完成畫面
        <div className="quiz-complete">
          <h2>最後</h2>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
