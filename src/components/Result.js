import { Container, Radio, RadioGroup, FormControlLabel, Typography } from "@mui/material";

const Result = ({ questions, answers, result }) => {
    return (
        <Container sx={{width: "85vw", background: "white", my: "40px", borderRadius: "20px"}}>
            <Typography mt="12px" textAlign={"center"} variant="h5">Score : {result.correct}/{result.correct + result.wrong}</Typography>
            <ol>
                {questions.map((question, i) =>
                    <li key={i} style={{color: result.details[i] ? "green" : "red"}}>
                        <p dangerouslySetInnerHTML={{ __html: question.question }} />
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={answers[i]}
                            name={`question ${i}`}
                            // onChange={(e) => handleChange(i, e.target.value)}
                        >
                            <FormControlLabel disabled value="True" control={<Radio />} label="True" />
                            <FormControlLabel disabled value="False" control={<Radio />} label="False" />
                        </RadioGroup>
                    </li>
                )}
            </ol>
            {/* {result !== null && (
                        <>
                            <p>Correct Answers: {result.correct}</p>
                            <p>Wrong Answers: {result.wrong}</p>
                        </>
                    )} */}
        </Container>
    );
}

export default Result;