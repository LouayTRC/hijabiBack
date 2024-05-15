const Role=require('../models/Role')

module.exports = (requiredRoles) => {
    return async (req, res, next) => {
        const userRole = await Role.findOne({_id:req.auth.user_Role});
        if (requiredRoles.includes(userRole.name)) {
            next();
        } else {
            res.status(403).json({ error: 'Unauthorized access' });
        }
    };
};