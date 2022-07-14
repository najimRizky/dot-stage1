import { Button, Divider, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link } from "react-router-dom";
import { doLogin } from "../function/Model";

const Login = () => {
    const login = (e) => {
        e.preventDefault()
        console.log()
        doLogin(e.target.email.value, e.target.password.value)
    }
    return (
        <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <Box sx={{minWidth: "300px", width: "40vw", bgcolor: "#fbfbfb", p: "20px"}}>
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
        </Container>
    );
}

export default Login;