import { useEffect, useState } from "react"
import { Card, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Courses() {
    const [courses, setCourses] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/admin/courses', {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {

                const data = res.data;
                setCourses(data.courses)
            })
            .catch(error => console.log("error fetching course: " + error))
    }, [])

    return <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {courses.map(course => <CourseCard key={course._id} course={course} />)}
    </div>
}

function CourseCard({ course }) {
    const navigate = useNavigate();

    return <Card
        variant={"outlined"}
        style={{
            width: 300, margin: 10, minHeight: 200, textAlign: "center"
        }}>
        <Typography variant="h6">{course.title} </Typography>
        <Typography variant={"subtitle1"}>{course.description}</Typography>
        <img src={course.imageLink} style={{ width: 300, height: 200 }} />
        <Button style={{ margin: 5 }}
            variant={"contained"}
            onClick={() => navigate("/courses/" + course._id)}
        >
            Edit
        </Button>
    </Card>
}

export default Courses
