/**
 * The Controller is how you interact with the database. The methods are exported
 * to be used in the api file.
 */

const User = require('../models/User.js');

exports.getUserById = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json( {
                success: false,
                error: 'User Not Found'
            })
        }
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting User ${req.params.id}: ${error.message}`
        })
    }
}