const productCtrl=require('../controllers/productController')
const Client=require('../models/Client')
const Command=require('../models/Command')
const Product=require('../models/Product');
const Vendeur = require('../models/Vendeur');

exports.createCommand = async (req, res, next) => {
    try {
        const { verified, productsCmmd } = await productCtrl.verifyProducts(req.body);

    if (!verified)
        return res.status(404).json({ message: "produit introuvable ou quantité insuffisante" })

    const client = await Client.findOne({ user: req.auth.user_id });
    console.log("client",client);
    let total = 0;
    for (const element of productsCmmd) {
        total += element.price * element.qte;
    }

    const command = new Command({
        date_cmmd: Date.now(),
        Products: productsCmmd,
        client: client,
        total: total,
        status: 0
    });
    command.save()
        .then(async (cmmd) => {
            await productCtrl.sellProducts(command.Products,cmmd._id, res)
            res.status(201).json(cmmd)
        })
        .catch(error => res.status(400).json({ error, message: "4" }))
    } catch (error) {
        res.status(400).json({ error, message: "5" })
    }
    
};


exports.getCommand = async (req, res, next) => {

    if (!req.params?.id) {
        const commands = await Command.find().populate('Products').populate('client').populate({
            path: 'Products',
            populate: { path: '_id' }
        })
        res.status(200).json(commands)
    }
    else {
        const cmmd = await Command.findOne({ _id: req.params.id })
        .populate({
            path: 'Products',
            populate: {
                path: '_id',
                populate: { path: 'category' }
            }
        })
        .populate({
            path: 'client',
            populate: { path: 'user' }
        });
        if (!cmmd) {
            return res.status(404).json({ message: "command not found" });
        }
        res.status(200).json(cmmd);

    }
};

exports.myCommands = async (req, res) => {
    try {

        const vendeur=await Vendeur.findOne({user:req.auth.user_id}).populate('user')

        const commands = await Command.find().populate('client').populate({
            path: 'Products',
            populate: { path: '_id' }
        }).populate({
            path: 'client',
            populate: { path: 'user' }
        });;

        let cmmds=[]
        console.log("vendeur ",vendeur._id);
        for (let cmmd of commands) {
            for (let product of cmmd.Products) {
                console.log("Product vendeur",product._id.vendeur);
                if (vendeur._id.equals(product._id.vendeur)) {
                    console.log("tst");
                    cmmds.push(cmmd)
                    console.log("prrr1",product);
                }
            }
        }
        res.status(200).json(cmmds);
    } catch (error) {
        console.error("Error fetching commands:", error);
        res.status(500).json({ error: "An error occurred while fetching commands." });
    }
};