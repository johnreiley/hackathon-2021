/**
 * Using the  ensureAuthenticated and ForwardAuthenticated middleware for protecting routes.
 */

module.exports = {
    /**
     * This code has the route redirect unauthed users to the login page
     */
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/users/login');
    },
    /**
     * The route is here leads to a page after the user logs in. 
     * This example has the redirect go to the dashboard
     */
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/dashboard');
    }
};
