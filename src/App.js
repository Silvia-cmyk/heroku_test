import React, {useState,useCallback, useMemo} from 'react';
import questions from "./questionData";
import './App.css'
import Button from '@mui/material/Button';
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import {View, Image, StyleSheet, TextInput} from 'react-native';

//one version
// 定義測驗題目數據，每個問題包含 question、options；移至另外的js檔省空間


function App() {
<<<<<<< HEAD
  const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);
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
    const particlesContainer = useMemo(() => (
    <div className="particles-container">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          "particles": {
                  "number": {
                    "value": 80,
                    "density": {
                      "enable": true,
                      "value_area": 800
                    }
                  },
                  "color": {
                    "value": "#ffffff"
                  },
                  "shape": {
                    "type": "star",
                    "stroke": {
                      "width": 0,
                      "color": "#000000"
                    },
                    "polygon": {
                      "nb_sides": 5
                    },
                    "image": {
                      "src": "img/github.svg",
                      "width": 100,
                      "height": 100
                    }
                  },
                  "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                      "enable": false,
                      "speed": 1,
                      "opacity_min": 0.1,
                      "sync": false
                    }
                  },
                  "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                      "enable": false,
                      "speed": 40,
                      "size_min": 0.1,
                      "sync": false
                    }
                  },
                  "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                  },
                  "move": {
                    "enable": true,
                    "speed": 4,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                      "enable": false,
                      "rotateX": 600,
                      "rotateY": 1200
                    }
                  }
                },
                "interactivity": {
                  "detect_on": "canvas",
                  "events": {
                    "onhover": {
                      "enable": true,
                      "mode": "grab"
                    },
                    "onclick": {
                      "enable": true,
                      "mode": "push"
                    },
                    "resize": true
                  },
                  "modes": {
                    "grab": {
                      "distance": 400,
                      "line_linked": {
                        "opacity": 1
                      }
                    },
                    "bubble": {
                      "distance": 400,
                      "size": 40,
                      "duration": 2,
                      "opacity": 8,
                      "speed": 3
                    },
                    "repulse": {
                      "distance": 200,
                      "duration": 0.4
                    },
                    "push": {
                      "particles_nb": 4
                    },
                    "remove": {
                      "particles_nb": 2
                    }
                  }
                },
                "retina_detect": true
        }}
      />
    </div>
  ), []);
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
=======
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
>>>>>>> origin/master
      }
    };

  // 處理提交答案的事件，將答案提交到後端處理（選擇題）
  const submitAnswer = async (selectedOption) => {
    try {
      const response = await fetch('/submit-data', {
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
      <div className="background-layer">
          {particlesContainer}
      </div>

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