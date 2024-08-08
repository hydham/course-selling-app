import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ paddingTop: "50px", marginBottom: 10 }}>
                <Typography variant={'h6'}>Welcome to Coursera. Signin Below</Typography>
            </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
                <TextField
                    id={"outlined-basic"}
                    label={"email"}
                    variant={"outlined"}
                    fullWidth={true}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br /><br />
                <TextField
                    id={"outlined-basic"}
                    label={"password"}
                    variant={"outlined"}
                    fullWidth={true}
                    type={"password"}
                    onChange={(e) => setPassword(e.target.value)} />
                <br /> <br />
                <Button
                    variant={"contained"}
                    size={'large'}
                    onClick={async () => {
                        const resp = await axios.post("http://localhost:3000/admin/login", {
                            username,
                            password
                        });
                        const data = resp.data;
                        if (!data.token) {
                            alert(data.message);
                        } else {
                            localStorage.setItem("token", data.token);
                            window.location = "/courses";
                        }
                    }}
                >sign in</Button>
            </Card>
        </div>
    </div>
}

export default Signin
