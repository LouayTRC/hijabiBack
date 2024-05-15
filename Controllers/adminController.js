const Admin=require('../models/Admin')
const Role=require('../models/Role')
const userCtrl = require('../controllers/UserController');


exports.addAdmin=async (req,res)=>{
    const role=await Role.findOne({name:'Admin'})
    const user = await userCtrl.createUser(req.body)
        user.role = role._id
        user.status=1
        await user.save()
        const admin=new Admin({
            user
        })
        admin.save()
        .then((admin) => res.status(201).json({ admin, message: 'admin created' }))
        .catch(error => res.status(400).json({ error }))
}