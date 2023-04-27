import { useEffect, useState } from 'react';
import { questions } from '../staticData/questionData'
import { randomValue } from '../utils';

function Question({handleContinuous}) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [selectedImage, setSelectedImage] = useState('')
    const [correctAnswer, setCorrectAnswer] = useState(false)
    const [wrongAnswer, setWrongAnswer] = useState(false)
    const [random, setRandom] = useState(0);
    const [intervalId, setIntervalId] = useState(null)
    const [timer, setTimer] = useState(15);

    useEffect(()=>{
        const id = setInterval(()=>{
            setTimer(timer => timer - 1)
        },1000)
        setIntervalId(id)
        
        return () => clearInterval(id)
    },[currentQuestion])

    useEffect(()=>{
        if(timer === 0) {
            clearInterval(intervalId)
            handleNext()
        }
    },[timer])
  
    const handleNext = () => {
        if(selectedImage === questions[currentQuestion].answer){
            setCorrectAnswer(true)
            setScore(score => score + 1)
        } else setWrongAnswer(true)

        setTimeout(()=>{
                if(currentQuestion < questions.length - 1){
                    setCurrentQuestion(currentQuestion => currentQuestion + 1)
                }else{
                    handleContinuous(correctAnswer ? score + 1: score)
                }
                setTimer(15)
                setSelectedImage('')
                setCorrectAnswer(false)
                setWrongAnswer(false)
                setRandom(randomValue())
            }, 700)
    }

    const handleImageClick = (answer) => {
        setSelectedImage(answer)
    }

    return (
        <div className="Question">
            <div className={correctAnswer ?  'answere-msg alert' : 'alert'}>Correct Answer!</div>
            <div className={wrongAnswer ?  'answere-msg alert wrong' : 'wrong alert'}>Oops!</div>
            <h1>Question {questions[currentQuestion].id} / 10</h1>
            <div className={correctAnswer || wrongAnswer ? 'bar' : 'timerBar'}/>
            <p className='score-header'>Score : {score} | Timer : {timer}</p>
                {
                    random === 1 ? 
                    <div className='image-container'>
                        <img className={selectedImage === "image1" ? 'selectedImage' : ''} src={questions[currentQuestion].image1} onClick={()=>handleImageClick('image1')}/>
                        <img className={selectedImage === "image2" ? 'selectedImage' : ''} src={questions[currentQuestion].image2} onClick={()=>handleImageClick('image2')}/>
                    </div>
                    :
                    <div className='image-container'>
                        <img className={selectedImage === "image2" ? 'selectedImage' : ''} src={questions[currentQuestion].image2} onClick={()=>handleImageClick('image2')}/>
                        <img className={selectedImage === "image1" ? 'selectedImage' : ''} src={questions[currentQuestion].image1} onClick={()=>handleImageClick('image1')}/>
                    </div>
                }
            <button disabled={correctAnswer || wrongAnswer} onClick={handleNext}>{questions[currentQuestion].isLast ?  "Contionus" : "Next"}</button>
        </div>
    );
}

export default Question;
