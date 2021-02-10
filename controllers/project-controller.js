/**
 * The Controller is how you interact with the database. The methods are exported
 * to be used in the api file.
 */

const Project = require('../models/Project.js');

/**
 * Gets all the projects from the database. 
 *  @returns success: true, count: projects.length, data: projects -- If successful
 *  @returns success: false, error: Error Getting Projects: ${error.message} -- If fail
 */
exports.getProjects = async (req, res, next) => {
    try {
        let projects = [];
        if (req.query.search) {
            let search = req.query.search;
            let regex = new RegExp(`.*${search}.*`);
            let query = { $regex: regex, $options: 'i' };
            projects = await Project.find({ $or: [{title: query}, {location: query}, {tags: query}] }).exec();
        } else {
            projects = await Project.find();
        }

        return res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting Projects: ${error.message}`
        })
    }
}

/**
 * Gets project based on provided id in `req.params.id`. 
 *  @returns success: true,  data: project  -- If project found
 *  @returns success: false,  data: 'Project Not Found' -- If project not found
 *  @returns success: false, error: Error Getting Project ${req.params.id}: ${error.message} -- If fail
 */
exports.getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                error: 'Project Not Found'
            })
        }
        return res.status(200).json({
            success: true,
            data: project
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting Project ${req.params.id}: ${error.message}`
        })
    }
}

/**
 * Updates project based on provided id in `req.params.id`. 
 *  @returns success: true,  data: updatedProject  -- If project found
 *  @returns success: false,  data: 'Project Not Found' -- If project not found
 *  @returns success: false, error: Error Updating Project ${req.params.id}: ${error.message} -- If fail
 */
exports.updateProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id).exec();
        if (!project) {
            return res.status(404).json({
                success: false,
                error: 'Project Not Found'
            })
        }
        project.set(req.body);
        var updatedProject = await project.save();
        return res.status(200).json({
            success: true,
            data: updatedProject
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Updating Project ${req.params.id}: ${error.message}`
        })
    }
}

/**
 * Creates a Project based on provided data in `req.body`. 
 *  @returns success: true,  data: project  -- If created successfully
 *  @returns success: false, error: messages -- If validation error
 *  @returns success: false, error: Error Adding Project: ${error.message} -- If fail
 */
exports.addProject = async (req, res, next) => {
    try {
        console.log(req.body)
        const project = await Project.create(req.body);
        console.log(project);
        return res.status(201).json({
            success: true,
            data: project
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: `Error Adding Project: ${error.message}`
            })
        }
    }

}

/**
 * Gets project based on provided id in `req.params.id`. 
 *  @returns success: true,  data: {}  -- If project deleted
 *  @returns success: false,  data: 'Project Not Found' -- If project not found
 *  @returns success: false, error: Error Deleting Project: ${error.message} -- If fail
 */
exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                error: 'Project Not Found'
            })
        }

        await project.remove();

        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Deleting Project: ${error.message}`
        })
    }
}

// Volunteer
exports.volunteerProject = async (req, res, next) => {
    try {
        console.log(req.params)
        var userId = req.user._id;

        // console.log(req.user);
        const project = await Project.findById(req.params.id)
        if (project) {
            if (project.volunteers.includes(userId)){
                return res.status(405).json({
                    success: false,
                    error: "You Already Volunteered!" 
                })
            }
            project.volunteers.push(userId);
            console.log(project)
            await project.save();

            return res.status(200).json({
                success: true,
                data: project

            })
        } else {
            return res.status(500).json({
                success: false,
                error: `Error Volunteering: ${error.message}`
            })
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: `Please Login`
        })
    }
}