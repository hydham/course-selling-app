import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Typography } from '@mui/material';

function AddCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("");
    return <div style={{ padding: 20, display: "flex", justifyContent: "center" }}>
        <Card variant={"outlined"} style={{ padding: 20, width: 600 }}>
            <Typography style={{ marginBottom: 10 }} >ADD NEW COURSE</Typography>
            <TextField
                id={"outlined-basic"}
                label={"Title"}
                variant={"outlined"}
                fullWidth={true}
                onChange={(e) => setTitle(e.target.value)} /><br /><br />
            <TextField
                id={"outlined-basic"}
                label={"Description"}
                variant={"outlined"}
                fullWidth={true}
                onChange={(e) => setDescription(e.target.value)} /> <br /><br />
            <TextField
                id={"outlined-basic"}
                label={"Price"}
                type={"number"}
                variant={"outlined"}
                fullWidth={true}
                onChange={(e) => setPrice(e.target.value)} /> <br /><br />
            <TextField
                id={"outlined-basic"}
                label={"Image Link"}
                variant={"outlined"}
                fullWidth={true}
                onChange={(e) => setImage(e.target.value)} /> <br /><br />
            <Button
                variant='contained'
                size='large'
                onClick={() => {
                    fetch("http://localhost:3000/admin/courses", {
                        method: "POST",
                        body: JSON.stringify({
                            title,
                            description,
                            price: price,
                            imageLink: image,
                            published: true
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                }}
            >add course</Button>
        </Card>
    </div>
}

export default AddCourse