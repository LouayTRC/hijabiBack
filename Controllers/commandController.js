const productCtrl=require('../controllers/productController')
const Client=require('../models/Client')
const Command=require('../models/Command')
const Product=require('../models/Product')

exports.createCommand = async (req, res, next) => {

    const { verified, productsCmmd } = await productCtrl.verifyProducts(req.body);

    if (!verified)
        return res.status(404).json({ message: "produit introuvable ou quantité insuffisante" })

    const client = await Client.findOne({ user: req.auth.user_id });
    let total = 0;
    for (const element of productsCmmd) {
        total += element.price * element.qte;
    }

    const command = new Command({
        date_cmmd: Date.now(),
        Products: productsCmmd,
        Client: client,
        total: total,
        status: 0
    });
    command.save()
        .then(async (cmmd) => {
            await productCtrl.sellProducts(command.Products, res)
            res.status(201).json(cmmd)
        })
        .catch(error => res.status(400).json({ error, message: "4" }))
};


exports.getCommand = async (req, res, next) => {

    if (!req.params?.id) {
        const commands = await Command.find().populate('Products').populate('Client').populate({
            path: 'Products',
            populate: { path: 'product' }
        });
        res.status(200).json(commands)
    }
    else {
        const cmmd = await Command.findOne({ _id: req.params.id }).populate('Products').populate('Client');
        if (!cmmd) {
            return res.status(404).json({ message: "command not found" });
        }
        res.status(200).json(cmmd);

    }
};