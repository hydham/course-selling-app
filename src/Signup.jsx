import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ paddingTop: "50px", marginBottom: 10 }}>
                <Typography variant='h6'>Welcome to Coursera. Signup Below</Typography>
            </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card variant="outlined" style={{ width: 400, padding: 20 }}>
                <TextField
                    label="email"
                    variant="outlined"
                    fullWidth={true}
                    onChange={(e) => setUsername(e.target.value)} />
                <br /><br />
                <TextField
                    label="password"
                    variant="outlined"
                    fullWidth={true}
                    type={"password"}
                    onChange={(e) => setPassword(e.target.value)} />
                <br /> <br />
                <Button
                    variant="contained"
                    size='large'
                    onClick={async () => {
                        const resp = await axios.post("http://localhost:3000/admin/signup", {
                            username, password
                        });
                        const data = resp.data;
                        if (!data.token) {
                            alert(data.message)
                        } else {
                            localStorage.setItem("token", data.token);
                            window.location = "/courses"
                        }
                    }}>Register
                </Button>
            </Card>
        </div>
    </div>
}

export default Signup
