/**
 * Have Routes here for your views.
 */

const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('index', { user: req.user }));
router.get('/projects', (req, res) => res.render('projects', { user: req.user }));
router.get('/project', (req, res) => {
    res.render('project', { user: req.user }) 
});
router.get('/addProject', ensureAuthenticated, (req, res) => res.render('addProject', { user: req.user }));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user, auth: true });
});


module.exports = router;