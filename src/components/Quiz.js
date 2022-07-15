import { CircularProgress } from "@mui/material";
import { Box} from "@mui/system";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Countdown, {calcTimeDelta} from "react-countdown";
import { connect } from "react-redux";
import Question from "./Question";
import { Navigate } from "react-router-dom";
import QuestionNav from "./QuestionNav";
import Result from "./Result";


const Quiz = ({user}) => {
    const [questions, setQuestion] = useState(null)
    const [answers, setAnswers] = useState({})
    const [result, setResult] = useState(null)
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [timer, setTimer] = useState(Date.now() + (1000 * 15 * 60)) // (1000 x minutes x second)
    const [finish, setFinish] = useState(false)

    const countdownTimer = useRef()

    const getQuestion = () => {
        const localDataQuiz = JSON.parse(window.localStorage.getItem("quizzes"))
        const currentUser = localDataQuiz !== null ? localDataQuiz.find(quiz => quiz.user.email === user.email) : undefined
        if(currentUser === undefined){
            axios.get('https://opentdb.com/api.php?&amount=15&type=boolean')
            .then((resp) => {
                setQuestion(resp.data.results)
                const newLocalDataQuiz = localDataQuiz !== null ? [
                    ...localDataQuiz,
                    {
                    user: user,
                    quiz: { questions : resp.data.results, }
                }] : [{
                        user: user,
                        quiz: { questions : resp.data.results, }
                }]
                window.localStorage.setItem("quizzes", JSON.stringify(newLocalDataQuiz))
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            setQuestion(currentUser.quiz.questions)
        }
    }


    useEffect(() => {
        getQuestion()
        // if(window.localStorage.getItem("timeRemain") !== null){
        //     setTimer(Number(window.localStorage.getItem("timeRemain")) + (1000 * 30 * 60))
        // }else{
        //     setTimer(Date.now() + (1000 * 30 * 60))
        // }
        // countdownTimer.current.start()
        window.addEventListener("beforeunload", () => {
            // console.log()
            // window.localStorage.setItem("timeRemain", +Date.now())
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log(answers)
    }, [answers])

    const addAnswers = (i, value) => {
        setAnswers({...answers, [i]: value})
    }

    const deleteAnswers = (i) => {
        const tmp = {...answers}
        delete tmp[i]
        setAnswers(tmp)
    }

    const nextQuestion = () => {
        setActiveQuestion(activeQuestion+1)
    }

    const prevQuestion = () => {
        setActiveQuestion(activeQuestion-1)
    }

    const goToQuestion = (i) => {
        if(i !== activeQuestion)
            setActiveQuestion(i)
    }

    const goToResult = () => {
        setFinish(true)
        checkAnswer()
        emptyLocalStorage()
    }

    const emptyLocalStorage = () => {
        let tmp = JSON.parse(window.localStorage.getItem("quizzes")).filter(quiz => {return quiz.user.email !== user.email})
        window.localStorage.setItem("quizzes", JSON.stringify(tmp))        
    }

    const checkAnswer = () => {
        let resultTmp = {
            correct: 0,
            wrong: 0,
            details: {}
        }
        questions.forEach((question, i) => {
            if(answers[i] === question.correct_answer){
                resultTmp.details[i] = true
                resultTmp["correct"]++
            }else{
                resultTmp.details[i] = false
                resultTmp["wrong"]++
            }
        })
        setResult(resultTmp)
    }


    

    return (
        <Box height={!finish ? "100vh" : "fit-content"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            {!finish && 
                <Box mb={"10px"} fontSize={"24px"} color={"white"} >
                    Time remaining: <Countdown ref={countdownTimer} date={timer} onComplete={goToResult} />
                </Box>
            }
            {questions === null ? (
                <Box sx={{display: "flex", justifyContent: "center"}}><CircularProgress/></Box>
                ) : !finish ? (
                    <>
                        <Question data={questions[activeQuestion]} i={activeQuestion} answer={answers[activeQuestion]} action={{nextQuestion, prevQuestion, addAnswers, deleteAnswers, goToResult}}/>
                        <QuestionNav goToQuestion={goToQuestion} answers={answers} active={activeQuestion} total={questions.length}/>
                    </>
                ) : (
                    <Result questions={questions} answers={answers} result={result} />
                )
            }
        </Box>
        
    )
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(Quiz);