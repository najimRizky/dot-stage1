import { Box, Button, Container, Typography } from "@mui/material";
import { connect } from "react-redux/es/exports";
import { Navigate } from "react-router-dom";
import {Link} from "react-router-dom"

const Home = ({user}) => {
    console.log(user)
    return (  
        <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            {user ? (
                <Box sx={{borderRadius: "10px", textAlign: "center",minWidth: "300px", width: "40vw", bgcolor: "#fbfbfb", p: "20px"}}>
                    <Typography mb={2}>Are you ready to take the quiz?</Typography>
                    <Link style={{textDecoration: "none"}} to="/quiz"><Button variant="contained">Start Quiz</Button></Link>
                </Box>
            ) : (
                <Navigate to="/login" replace={true} />
            )}
            
        </Container>
    );
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}
 
export default connect(mapStateToProps)(Home);