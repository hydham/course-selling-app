const express = require('express');
const {ADMINS, COURSES, USERS} = require('../db');
const jwt = require('jsonwebtoken');
const {SECRET, authenticateJwt} = require('../auth')


const router = express.Router();

// Admin routes
router.post('/signup', async(req, res) => {
    const { username, password } = req.body;
    const admin = await ADMINS.findOne({username});
    if (admin) {
      res.status(403).json({ message: 'Admin already exists' });
    } else {
      const newAdmin = new ADMINS({username, password});
      await newAdmin.save();  
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Admin created successfully', token });
    }
  });
  
  router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const admin = await ADMINS.findOne({username, password});
    if (admin) {
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
  
  router.get('/me', authenticateJwt, (req, res) => {
    res.json({
      username: req.user.username
    })  
  })
  
  router.post('/courses', authenticateJwt, async(req, res) => {
    const newCourse = new COURSES(req.body);
    await newCourse.save(); 
    res.json({ message: 'Course created successfully', courseId: newCourse.id });
  });
  
  router.put('/courses/:courseId', authenticateJwt, async(req, res) => {
    const course = await COURSES.findByIdAndUpdate(req.params.courseId, req.body, {new: true})
    if (course) {
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
  router.get('/courses', authenticateJwt, async(req, res) => {
    const courses = await COURSES.find({});
    res.json({ courses });
  });
  
  router.get('/courses/:courseId', authenticateJwt, async(req, res) => {
    const course = await COURSES.findById(req.params.courseId);
    if (course) {
      res.status(200).json({course})
    }
  });

  module.exports = router