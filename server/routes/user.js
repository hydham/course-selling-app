const express = require('express');
const fs = require('fs');
const {ADMINS, COURSES, USERS} = require('../db');
const jwt = require('jsonwebtoken');
const {SECRET, authenticateJwt} = require('../auth')

const router = express.Router();

router.post('/signup', async(req, res) => {
    const { username, password } = req.body;
    const user = await USERS.findOne({username}); 
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new USERS({username, password });
      await newUser.save();
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  
  router.post('/login', async(req, res) => {
    const { username, password } = req.headers;
    const user = await USERS.findOne({username, password});
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
  
  router.get('/courses', authenticateJwt, async(req, res) => {
    const courses = await COURSES.find({published: true});
    res.json({courses});
  });
  
  router.post('/courses/:courseId', authenticateJwt, async(req, res) => {
    const course = await COURSES.findById(req.params.courseId);
    if (course) {
      const user = await USERS.findOne({username: req.user.username})
      user.purchasedCourses.push(course);
      await user.save();
      res.json({message: "course updated"})
    } else {
      res.json({message: "course not found"})
    }
  });
  
  router.get('/purchasedCourses', authenticateJwt, async(req, res) => {
    const user = await USERS.findOne({username: req.user.username})
    if (user) {
      const purchases = await user.populate('purchasedCourses')
      res.json({courses: purchases.purchasedCourses})
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  });

  module.exports = router