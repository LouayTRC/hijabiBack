const Client = require("../models/Client")


exports.getClients=async (req,res)=>{
    const clients = await Client.find().populate('user')
    res.status(200).json(clients)
}