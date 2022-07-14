import { CircularProgress, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";

const Quiz = () => {
    const [questions, setQuestion] = useState(null)
    const [answers, setAnswer] = useState({})
    const getQuestion = () => {
        axios.get('https://opentdb.com/api.php?amount=10&type=boolean&category=18')
        .then((results) => {
            // console.log(results.data.results)
            setQuestion(results.data.results)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        getQuestion()
    }, [])

    useEffect(() => {
        console.log(answers)
    }, [answers])


    const handleChange = (i, value) => {
        setAnswer({...answers, [i]: value})
    }
    return (
        <Container>
            <h1>Quiz</h1>
                {questions === null ? (<Box sx={{display: "flex", justifyContent: "center"}}><CircularProgress/></Box>) : (
                    <ol>
                        {questions.map((question, i) => 
                            <li key={i}>
                                <p dangerouslySetInnerHTML={{ __html: question.question }} />
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue=""
                                    name={`question ${i}`}
                                    onChange={(e) => handleChange(i, e.target.value) }
                                >   
                                    <FormControlLabel value="true" control={<Radio />} label="True" />
                                    <FormControlLabel value="false" control={<Radio />} label="False" />
                                </RadioGroup>
                            </li>
                        )}
                    </ol>
                )}
        </Container>
    )
}

export default Quiz;