import { CircularProgress, FormControlLabel, Radio, RadioGroup, Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";


const Quiz = () => {
    const [questions, setQuestion] = useState(null)
    const [answers, setAnswer] = useState({})
    const [result, setResult] = useState(null)
    
    let token = "ead7ce7206e423e3c7b4f28f79e5642e22135c43f8182cef24a5ec2fdbeb7856"

    const getQuestion = () => {
        axios.get('https://opentdb.com/api.php?amount=30&type=boolean&category=18&token=' + token)
        .then((resp) => {
            console.log(resp)
            switch(resp.data.response_code){
                case 0: 
                    setQuestion(resp.data.results)
                break
                case 3: 
                    axios.get("https://opentdb.com/api_token.php?command=request")
                    .then((resp) => {
                        token = resp.data.token
                        getQuestion()
                    })
                break
                case 4: 
                    axios.get("https://opentdb.com/api_token.php?command=reset&token=" + token)
                    .then(() => {
                        getQuestion()
                    })
                break
                default: throw new Error("Something went wrong")
            }
        })
        .catch((err) => {
            console.log(err)
        })

        
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
        <Container sx={{background: "white"}}>
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