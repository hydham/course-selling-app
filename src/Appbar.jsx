import { Typography } from "@mui/material"
import { Button } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // version 5.2.0
import axios from "axios";

function Appbar() {
    const [username, setUsername] = useState("")

    useEffect(() => {
        axios.get('http://localhost:3000/admin/me', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then((resp) => {
                const data = resp.data;
                setUsername(data.username)
            })
    }, [])

    if (username) {
        return <LoggedBar username={username} />
    }

    return <GuestBar />

}

function LoggedBar(props) {
    const navigate = useNavigate();
    return <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 10
    }}>
        <div>
            <Typography variant={"h6"}>Coursera</Typography>
        </div>
        <div style={{ display: "flex" }}>
            <Button variant={"text"}
                onClick={() => navigate('/courses')}>
                COURSES
            </Button>
            <Button variant={"text"}
                onClick={() => navigate('/addcourse')}>
                ADD COURSE
            </Button>
            <Button variant={"contained"} onClick={() => {
                localStorage.setItem("token", null);
                window.location = "/"
            }}>Log Out</Button>
        </div>
    </div>
}

function GuestBar() {
    const navigate = useNavigate();

    return <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 10
    }}>
        <div>
            <Typography variant={"h6"}>Coursera</Typography>
        </div>
        <div>
            <Button style={{ marginRight: 10 }} variant={"contained"}
                onClick={() => {
                    // window.location = "/signup"
                    navigate("/signup")
                }}>
                Sign Up</Button>

            <Button variant={"contained"} onClick={() => {
                // window.location = "/signin"
                navigate("/signin")
            }}>Sign In</Button>
        </div>
    </div>
}

export default Appbar