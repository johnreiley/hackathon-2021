const express = require('express');
const router = express.Router();

/* Project Controller */ 
const { getProjects, getProjectById, addProject, updateProject, deleteProject} = require('../controllers/project-controller')

/* User Controller */
const {getUserById} = require('../controllers/user-controller')

/**
 * 
 * Add your routes for your API endpoints here. Don't forget to add your  controller!  
 */

router
    .route('/projects/')
    .get(getProjects)
    .post(addProject)

router
    .route('/projects/:id')
    .get(getProjectById)
    .put(updateProject)
    .delete(deleteProject)

router
    .route('/user/:id')
    .get(getUserById)

module.exports = router;