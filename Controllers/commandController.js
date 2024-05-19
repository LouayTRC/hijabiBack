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
    } catch (error) {
        res.status(400).json({ error, message: "5" })
    }
    
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

exports.myCommands = async (req, res) => {
    try {

        const vendeur=await Vendeur.findOne({user:req.auth.user_id}).populate('user')
        console.log("venderu",vendeur);

        

        const commands = await Command.find().populate({
            path: 'Products.product',
            model: 'Product'
        }).populate('Client');

        cmmds=[]
        for (let element of commands) {
            for (let product of element.Products) {
                console.log("dd",product);
                let p = await Product.findOne({ _id: product._id.toString() });
                console.log("p",p);
                if (p.Vendeur==vendeur._id) {
                    cmmds.push(element)
                    break
                }

            }
            
        }

        
        res.status(200).json(cmmds);
    } catch (error) {
        console.error("Error fetching commands:", error);
        res.status(500).json({ error: "An error occurred while fetching commands." });
    }
};