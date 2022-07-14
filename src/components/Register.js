import { Button, Divider, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link } from "react-router-dom";

const Register = () => {
    const register = (e) => {
        e.preventDefault()
    }
    return (
        <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <Box sx={{minWidth: "300px", width: "40vw", bgcolor: "#fbfbfb", p: "20px"}}>
                <Typography variant={"h2"} fontWeight={"bold"} fontSize={"28px"} textAlign={"center"}>Register</Typography>
                <form onSubmit={register} className="form">
                    <TextField required sx={{my: "8px"}} fullWidth type={"text"} label="Name" variant="standard" />
                    <TextField required sx={{my: "8px"}} fullWidth type={"email"} label="Email" variant="standard" />
                    <TextField required sx={{my: "8px"}} fullWidth type={"password"} label="Password" variant="standard" />
                    <Button sx={{my: "8px"}} fullWidth type={"submit"} variant={"contained"}>Register</Button>
                    <Divider>Or</Divider>
                    <Box sx={{textAlign: "center"}} >
                        <Link to="/login" style={{textDecoration: "none"}}>
                            <Button link variant={"text"}>Login here</Button>
                        </Link>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default Register;