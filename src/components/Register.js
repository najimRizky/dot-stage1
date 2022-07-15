import { Button, Divider, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link } from "react-router-dom";
import { doRegister } from "../function/Model";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";




const Register = ({user}) => {
    const register = (e) => {
        e.preventDefault()
        if(doRegister(e.target.name.value, e.target.email.value, e.target.password.value)){
            alert("Please Login to start the quiz")
            window.location = "/"
        }else{
            alert("Email is already registered")
        }
    }
    return (
        <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            {!user ? (
                <Box sx={{borderRadius: "10px", minWidth: "300px", width: "40vw", bgcolor: "#fbfbfb", p: "20px"}}>
                    <Typography variant={"h2"} fontWeight={"bold"} fontSize={"28px"} textAlign={"center"}>Register</Typography>
                    <form onSubmit={register} className="form">
                        <TextField required name="name" sx={{my: "8px"}} fullWidth type={"text"} label="Name" variant="standard" />
                        <TextField required name="email" sx={{my: "8px"}} fullWidth type={"email"} label="Email" variant="standard" />
                        <TextField required name="password" sx={{my: "8px"}} fullWidth type={"password"} label="Password" variant="standard" />
                        <Button sx={{my: "8px"}} fullWidth type={"submit"} variant={"contained"}>Register</Button>
                        <Divider>Or</Divider>
                        <Box sx={{textAlign: "center"}} >
                            <Link to="/login" style={{textDecoration: "none"}}>
                                <Button variant={"text"}>Login here</Button>
                            </Link>
                        </Box>
                    </form>
                </Box>
            ) : (
                <Navigate to="/" replace={true} />
            )}
        </Container>
    );
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(Register);