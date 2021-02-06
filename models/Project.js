const mongoose = require('mongoose');

/**
 * Project Schema
 */
const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    dateStart: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateEnd: {
        type: Date,
    },
    volunteers: {
        type: Array
    },
    organizer: {
        type: String,
        required: true
    },
    image: {
        type: String
}
});

const Project = mongoose.model('project', ProjectSchema);

module.exports = Project;