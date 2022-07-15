import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Countdown, { calcTimeDelta } from "react-countdown";
import { connect } from "react-redux";
import Question from "./Question";
import { Navigate } from "react-router-dom";
import QuestionNav from "./QuestionNav";
import Result from "./Result";
import { useBeforeunload } from "react-beforeunload";

// const paused =  JSON.parse(window.localStorage.getItem("paused"))
// let timerCountdown


const Quiz = ({ user }) => {
    const [questions, setQuestion] = useState(null)
    const [answers, setAnswers] = useState({})
    const [result, setResult] = useState(null)
    const [activeQuestion, setActiveQuestion] = useState(0)
    // const [timer, setTimer] = useState(
    //     paused === null ? Date.now() +  (1000 * 10 * 60) 
    //     : paused.find(data => data.email === user.email) ? 
    //     Number(paused.find(data => data.email === user.email).paused) 
    //     : Date.now() +  
    // ) // (1000 x minutes x second)
    const [timer, setTimer] = useState(Date.now())
    const [finish, setFinish] = useState(false)
    const countdownRef = useRef()

    const getQuestion = () => {
        const localDataQuiz = JSON.parse(window.localStorage.getItem("quizzes"))
        const currentUser = localDataQuiz !== null ? localDataQuiz.find(quiz => quiz.user.email === user.email) : undefined
        if (currentUser === undefined) {
            axios.get('https://opentdb.com/api.php?&amount=15&type=boolean')
                .then((resp) => {
                    setQuestion(resp.data.results)
                    determineTimer()
                    const newLocalDataQuiz = localDataQuiz !== null ? [
                        ...localDataQuiz,
                        {
                            user: user,
                            quiz: { questions: resp.data.results, }
                        }] : [{
                            user: user,
                            quiz: { questions: resp.data.results, }
                        }]
                    window.localStorage.setItem("quizzes", JSON.stringify(newLocalDataQuiz))
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            setQuestion(currentUser.quiz.questions)
            determineTimer()
        }
    }

    const determineTimer = () => {
        const paused =  JSON.parse(window.localStorage.getItem("paused"))
        if(paused === null){
            setTimer(Date.now() +  (1000 * 5 * 60))
        }else{
            const tmpData = paused.find(data => data.email === user.email)
            if(tmpData){
                setTimer(+Date.now() + Number(tmpData.paused))
            }else{
                setTimer(+Date.now() + (1000 * 5 * 60))
            }
        }
    }

    useEffect(() => {
        if (!user) window.location = "/login"
        getQuestion()
        // eslint-disable-next-line
    }, [])

    useBeforeunload(() => {
        const pausedUser = JSON.parse(window.localStorage.getItem("paused"))
        let newPausedUser;
        if (pausedUser !== null) {
            newPausedUser = pausedUser.filter(paused => { return paused.email !== user.email })
            newPausedUser = [...newPausedUser, {
                answer: answers,
                email: user.email,
                paused: calcTimeDelta(timer).total,
            }]
        } else {
            newPausedUser = [{
                answer: answers,
                email: user.email,
                paused: calcTimeDelta(timer).total,
            }]
        }
        window.localStorage.setItem("paused", JSON.stringify(newPausedUser))
    })

    useEffect(() => {
        console.log(timer)
        if(timer > +Date.now()){
            countdownRef.current.api.start()
        }
    }, [timer])

    const addAnswers = (i, value) => {
        setAnswers({ ...answers, [i]: value })
    }

    const deleteAnswers = (i) => {
        const tmp = { ...answers }
        delete tmp[i]
        setAnswers(tmp)
    }

    const nextQuestion = () => {
        setActiveQuestion(activeQuestion + 1)
    }

    const prevQuestion = () => {
        setActiveQuestion(activeQuestion - 1)
    }

    const goToQuestion = (i) => {
        if (i !== activeQuestion)
            setActiveQuestion(i)
    }

    const goToResult = () => {
        setFinish(true)
        checkAnswer()
        emptyLocalStorage()
    }

    const emptyLocalStorage = () => {
        let tmp = JSON.parse(window.localStorage.getItem("quizzes")).filter(quiz => { return quiz.user.email !== user.email })
        window.localStorage.setItem("quizzes", JSON.stringify(tmp))
        if(window.localStorage.getItem("paused")){
            let tmp2 = JSON.parse(window.localStorage.getItem("paused")).filter(data => { return data.email !== user.email })
            if(tmp2.length === 0){
                window.localStorage.removeItem("paused")
            }else{
                window.localStorage.setItem("paused", JSON.stringify(tmp2))

            }
        }
    }

    const checkAnswer = () => {
        let resultTmp = {
            correct: 0,
            wrong: 0,
            details: {}
        }
        questions.forEach((question, i) => {
            if (answers[i] === question.correct_answer) {
                resultTmp.details[i] = true
                resultTmp["correct"]++
            } else {
                resultTmp.details[i] = false
                resultTmp["wrong"]++
            }
        })
        setResult(resultTmp)
    }




    return (
        <Box height={!finish ? "100vh" : "fit-content"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            {user ? (
                <>
                    {!finish &&
                        <Box mb={"10px"} fontSize={"24px"} color={"white"} >
                            Time remaining: <Countdown autoStart={false} ref={countdownRef} date={timer} onComplete={goToResult} />
                        </Box>
                    }
                    {questions === null ? (
                        <Box sx={{ display: "flex", justifyContent: "center" }}><CircularProgress /></Box>
                    ) : !finish ? (
                        <>
                            <Question data={questions[activeQuestion]} i={activeQuestion} answer={answers[activeQuestion]} action={{ nextQuestion, prevQuestion, addAnswers, deleteAnswers, goToResult }} />
                            <QuestionNav goToQuestion={goToQuestion} answers={answers} active={activeQuestion} total={questions.length} />
                        </>
                    ) : (
                        <Result questions={questions} answers={answers} result={result} />
                    )
                    }

                </>
            ) : (
                <Navigate to="/login" replace={true} />
            )}
        </Box>

    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Quiz);