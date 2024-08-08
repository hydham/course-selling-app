import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Signup'
import Appbar from './Appbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './Signin'
import AddCourse from './AddCourse'
import Courses from './Courses'
import Course from './Course'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {
  return (
    <div style={{ background: "#eeeeee", width: "100vw", height: "100vh" }}>
      <RecoilRoot>
        <BrowserRouter>
          <Appbar></Appbar>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/courses" element={<Courses />} />
            <Route path={"/courses/:courseId"} element={<Course />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}


export default App
