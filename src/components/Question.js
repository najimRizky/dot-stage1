import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, Container, FormControlLabel, IconButton, Radio, RadioGroup, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from 'react';

const Question = ({ data, i , action, answer}) => {
    const [currAnswer, setCurrAnswer] = useState("")

    const submitQuestion = () => {
        action.addAnswers(i, currAnswer)
        // action.nextQuestion()
    }

    const clearCurrentAnswer = () => {
        action.deleteAnswers(i)
        setCurrAnswer("")
    }

    useEffect(() => {
        // console.log(data)
        setCurrAnswer(answer === undefined ? "" : answer)
    }, [data])

    return (
        <Box sx={{ borderRadius: "10px 10px 0 0", width: "85vw", height: "70vh", background: "white", overflow: "hidden" }}>
            <Box fullWidth sx={{ height: "15%", background: "#104f53", display: "flex", color: "white", alignItems: "center", px: "20px" }}>
                <Box>
                    <IconButton onClick={action.prevQuestion} disabled={i === 0 ? true : false} sx={{ border: "1px solid rgba(255,255,255,0.5)", color: "white", transform: "rotate(180deg)" }}><ArrowForwardIosIcon /></IconButton>
                </Box>
                <Box width={"100%"} textAlign="center">
                    <Typography fontSize={"24px"}>Question number {i+1}</Typography>
                </Box>
                <Box>
                    <IconButton onClick={action.nextQuestion} disabled={i === 14 ? true : false} sx={{ border: "1px solid rgba(255,255,255,0.5)", color: "white" }}><ArrowForwardIosIcon /></IconButton>
                </Box>
            </Box>
            <Box fullWidth sx={{ height: "85%", background: "white", pt: "20px" }}>
                <Container>
                    <Typography fontSize={"24px"} marginBottom={"20px"} dangerouslySetInnerHTML={{ __html: data.question }} />
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={currAnswer}
                        name={`question ${i}`}
                        onChange={(e) => setCurrAnswer(e.target.value)}
                    >
                        <FormControlLabel value="True" control={<Radio />} label={<Typography fontSize={"24px"}> True </Typography>} />
                        <FormControlLabel value="False" control={<Radio />} label={<Typography fontSize={"24px"}> False </Typography>} />
                    </RadioGroup>
                    <Box mt={"20px"}>
                        <Button disabled={currAnswer === "" ? true : false} variant="contained" onClick={submitQuestion} >Submit</Button>
                        <Button disabled={currAnswer === "" ? true : false} onClick={clearCurrentAnswer} variant="text" >Clear Answer</Button>
                        {i === 14 && 
                            <Button color='success' sx={{float: "right"}} onClick={action.goToResult} variant="contained" >Finish Quiz</Button>
                        }
                    </Box>

                </Container>
            </Box>
            {/* <h1>data</h1> */}
        </Box>
    );
}

export default Question;