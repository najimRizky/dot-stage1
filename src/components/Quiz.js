import { CircularProgress } from "@mui/material";
import { Box} from "@mui/system";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Countdown, {calcTimeDelta} from "react-countdown";
import { connect } from "react-redux";
import Question from "./Question";
import { Navigate } from "react-router-dom";


const Quiz = ({user}) => {
    const [questions, setQuestion] = useState(null)
    const [answers, setAnswers] = useState({})
    const [result, setResult] = useState(null)
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [timer, setTimer] = useState(Date.now() + (1000 * 30 * 60)) // (1000 x minutes x second)
    // const [timer, setTimer] = useState(Date.now() + (2))
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
        // console.log(answers)
    }, [answers])

    const updateAnswers = (i, value) => {
        setAnswers({...answers, [i]: value})
    }

    const nextQuestion = () => {
        setActiveQuestion(activeQuestion+1)
    }

    const prevQuestion = () => {
        setActiveQuestion(activeQuestion-1)
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
        // setResult(resultTmp)
    }


    

    return (
        <Box height={"100vh"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Box mb={"10px"} fontSize={"24px"} color={"white"} >
                Time remaining: <Countdown ref={countdownTimer} date={timer} onComplete={checkAnswer} />
            </Box>
            
            {questions === null ? (<Box sx={{display: "flex", justifyContent: "center"}}><CircularProgress/></Box>) : (
                <Question data={questions[activeQuestion]} i={activeQuestion} answer={answers[activeQuestion]} action={{nextQuestion, prevQuestion, updateAnswers}}/>
            )}
        </Box>
        // <Container sx={{background: "white"}}>
        //     <h1>Quiz</h1>
        //         {questions === null ? (<Box sx={{display: "flex", justifyContent: "center"}}><CircularProgress/></Box>) : (
        //             <>
        //                 <ol>
        //                     {questions.map((question, i) => 
        //                         <li key={i}>
        //                             <p dangerouslySetInnerHTML={{ __html: question.question }} />
        //                             <RadioGroup
        //                                 aria-labelledby="demo-radio-buttons-group-label"
        //                                 defaultValue=""
        //                                 name={`question ${i}`}
        //                                 onChange={(e) => handleChange(i, e.target.value)}
        //                             >   
        //                                 <FormControlLabel value="True" control={<Radio />} label="True" />
        //                                 <FormControlLabel value="False" control={<Radio />} label="False" />
        //                             </RadioGroup>
        //                         </li>
        //                     )}
        //                 </ol>
        //                 {result !== null && (
        //                     <>
        //                         <p>Correct Answers: {result.correct}</p>
        //                         <p>Wrong Answers: {result.wrong}</p>
        //                     </>
        //                 )}
        //                 <Button variant="contained" onClick={checkAnswer}>Submit</Button>
        //             </>
        //         )}
        // </Container>
    )
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(Quiz);