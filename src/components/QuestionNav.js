import {Typography } from "@mui/material";
import { Box } from "@mui/system";
import CheckIcon from '@mui/icons-material/Check';

const QuestionNav = ({ total, active, answers, goToQuestion }) => {
    return (
        <Box sx={{ background: "white", width: "85vw", justifyContent: "space-around", alignItems: "center", display: "flex",  borderRadius: "0 0 10px 10px"}}  >
            {[...Array(total)].map((x, i) =>
                <Box onClick={() => goToQuestion(i)} width={"100%"} height={"100%"} textAlign={"center"} sx={{ background: active === i ? "#007495" : "white", color: active === i ? "white" : "black", cursor: "pointer", position: "relative", border: "1px solid rgba(0,0,0,0.3)", borderRadius: `0 0 ${i === total-1 ? "10px" : "0"} ${i === 0 ? "10px" : "0"}` }} key={i} >
                    <Typography py={"10px"}>
                        {i + 1}
                    </Typography>
                    <Box sx={{position: "absolute", top: "-5px", right: "-4px", zIndex: "10", width: "15px", height: "15px", border: "2px solid green", background: "white", borderRadius: "50%", color: "black"}} >
                        {answers[i] !== undefined ? (
                            <CheckIcon sx={{width: "14px", transform: ("translateY(-4px)")}}/>
                        ) : (
                            <></>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default QuestionNav;