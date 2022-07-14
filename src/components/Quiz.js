import { CircularProgress, FormControlLabel, Radio, RadioGroup, Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";

const Quiz = () => {
    const [questions, setQuestion] = useState(null)
    const [answers, setAnswer] = useState({})
    const [result, setResult] = useState(null)
    const getQuestion = () => {
        axios.get('https://opentdb.com/api.php?amount=30&type=boolean&category=18&token=e90ff97ac47f5fe57f8d58b671f2112131cac10c1d1e3282213b574b24b70e72')
        .then((resp) => {
            console.log(resp)
            setQuestion(resp.data.results)
        })
        .catch((err) => {
            console.log(err)
        })

        // axios.get("https://opentdb.com/api_token.php?command=request")
        // .then((resp) => {
        //     // console.log(resp)
        // })
    }

    // Run Once on first render
    useEffect(() => {
        getQuestion()
    }, [])

    useEffect(() => {
        // console.log(answers)
    }, [answers])

    const handleChange = (i, value) => {
        setAnswer({...answers, [i]: value})
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
        // console.log(resultTmp)
    }

    return (
        <Container>
            <h1>Quiz</h1>
                {questions === null ? (<Box sx={{display: "flex", justifyContent: "center"}}><CircularProgress/></Box>) : (
                    <>
                        <ol>
                            {questions.map((question, i) => 
                                <li key={i}>
                                    <p dangerouslySetInnerHTML={{ __html: question.question }} />
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue=""
                                        name={`question ${i}`}
                                        onChange={(e) => handleChange(i, e.target.value)}
                                    >   
                                        <FormControlLabel value="True" control={<Radio />} label="True" />
                                        <FormControlLabel value="False" control={<Radio />} label="False" />
                                    </RadioGroup>
                                </li>
                            )}
                        </ol>
                        {result !== null && (
                            <>
                                <p>Correct Answers: {result.correct}</p>
                                <p>Wrong Answers: {result.wrong}</p>
                            </>
                        )}
                        <Button variant="contained" onClick={checkAnswer}>Submit</Button>
                    </>
                )}
        </Container>
    )
}

export default Quiz;