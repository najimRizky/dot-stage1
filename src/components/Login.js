import { Button, Divider, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { connect } from "react-redux";
import { doLogin } from "../function/Model";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";



const Login = ({user, setUser}) => {
    const login = (e) => {
        e.preventDefault()
        let reqUser = doLogin(e.target.email.value, e.target.password.value)
        if(reqUser){
            setUser(reqUser)
        }else{
            alert("Data is not valid or not found")
        }
    }
    return (
        <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            {!user ? (
                <Box sx={{borderRadius: "10px",minWidth: "300px", width: "40vw", bgcolor: "#fbfbfb", p: "20px"}}>
                <Typography variant={"h2"} fontWeight={"bold"} fontSize={"28px"} textAlign={"center"}>Login</Typography>
                <form onSubmit={login} className="form">
                    <TextField name="email" required sx={{my: "8px"}} fullWidth type={"email"} label="Email" variant="standard" />
                    <TextField name="password" required sx={{my: "8px"}} fullWidth type={"password"} label="Password" variant="standard" />
                    <Button sx={{my: "8px"}} fullWidth type={"submit"} variant={"contained"}>Login</Button>
                    <Divider>Or</Divider>
                    <Box sx={{textAlign: "center"}} >
                        <Link to="/register" style={{textDecoration: "none"}}>
                            <Button variant={"text"}>Register here</Button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (activeUser) => {
            dispatch({type: "SET_USER", user: activeUser})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);