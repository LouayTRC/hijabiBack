const User = require('../models/User');
const Client = require('../models/Client');
const userCtrl = require('../Controllers/userController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Role = require('../models/Role')
const Vendeur = require('../models/Vendeur')



exports.login = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "login/mdp incorrect" });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: "login/mdp incorrect" });
                    }
                    else {
                        if (user.status != 1) {
                            return res.status(401).json({ message: "your profile isn't activated " });
                        } else {
                            return res.status(200).json({
                                user,
                                token: jwt.sign(
                                    {
                                        user_id: user._id,
                                        user_Role: user.role
                                    },
                                    'f1sd3f12dsg1d65fs165f1ds6g1re6f1sq6f1sd65f1sd65srt1rs53fzeyehyutyj',
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    }
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.signup = async (req, res, next) => {
    try {
        const role = await Role.findOne({ _id: req.body.role })


    if (role.name == "Vendeur") {
        const user = await userCtrl.createUser(req.body)
        user.role = req.body.role
        user.status = 0
        await user.save()
        const vendeur = new Vendeur({
            user
        })
        vendeur.save()
            .then((vendeur) => res.status(201).json({ vendeur, message: 'vendeur created' }))
            .catch(error => res.status(400).json({ error }))
    } else {
        const user = await userCtrl.createUser(req.body)
        user.role = req.body.role
        user.status = 1
        await user.save()
        const client = new Client({
            user,
        })
        client.save()
            .then((client) => res.status(201).json({ client, message: 'client created' }))
            .catch(error => res.status(400).json({ error }))
    }
    } catch (error) {
        res.status(400).json({ error })
    }
    
}

exports.verifyToken = (req, res, next) => {
    const token = req.body.token;
    if (token) {
        const decode = jwt.verify(token, 'f1sd3f12dsg1d65fs165f1ds6g1re6f1sq6f1sd65f1sd65srt1rs53fzeyehyutyj');
        console.log("decode", decode);
        res.status(200).json({
            login: true,
            data: decode
        });
    } else {
        res.status(400).json({
            login: false,
            data: 'error'
        });
    }
}
