import React, {useState} from 'react';
import questions from "./questionData";
import './App.css'
import Button from '@mui/material/Button';
import {View, Image, StyleSheet, TextInput} from 'react-native';
import ParticlesBackground from './particleBackground';
// 定義測驗題目數據，每個問題包含 question、options；移至另外的js檔省空間


function App() {
    // 使用 useState 鉤子來管理當前題目和使用者答案
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [inputText, setInputText] = useState('');
    const [submittedText, setSubmittedText] = useState('');
    // 處理圖片大小顯化圖片
    const styles = StyleSheet.create({
        container: {
          paddingTop: 0,
        },
        tinyLogo: {
          width: 400,
          height: 250,
        },
        tinyLogo_01: {
          width: 200,
          height: 200,
        },
        input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color:'white',
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
        },
      });
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
  // 處理提交答案的事件，將答案提交到後端處理（輸入題）
  const handleSubmission = async () => {
    // 將輸入框的值提交至後端
    try {
      const response = await fetch('https://fasiapi-python-a8fc75911008.herokuapp.com/submit-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: inputText }),
      });

      if (response.ok) {
        console.log('Input submitted successfully');
        setSubmittedText(inputText);
      } else {
        console.error('Error submitting input');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <ParticlesBackground/>
      <div className="quiz-container">
      {/* 判斷是否還有問題未作答 */}
      {currentQuestion < questions.length -1 ? (
        <div className="question-container">
          <h1>問題 {currentQuestion + 1}</h1>
          {currentQuestion === 7 && (
            <View style={styles.container}>
              <Image
                style={styles.tinyLogo}
                source={require(`./image/${questions[currentQuestion].image}.png`)}
              />
            </View>
          )}
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
          <TextInput
            style={styles.input}
            placeholder="輸入信箱"
            value={inputText}
            onChangeText={(text) => setInputText(text)}
          />
          <Button
              onClick={handleSubmission} // 設置按鈕點擊事件處理函數
              variant="outlined"
              color="secondary"
              size="large"
          >送出</Button>
          {submittedText &&
            <p>完成</p>
          }
          <div className='qrcode'>
            {submittedText &&
              <View style={styles.container}>
                <Image
                style={styles.tinyLogo_01}
                source={require('./image/qr.ioi.tw.png')}
                />
              </View>
            }
          </div>
          {submittedText &&
              <a href="https://www.notion.so" target="_blank" rel="noopener noreferrer">連結</a>
          }
        </div>
      )}
    </div>
    </div>
  );
}
export default App;