const Product = require('../models/Product');
const Vendeur = require('../models/Vendeur');


exports.createProduct = async (req, res, next) => {
    const vendeur=await Vendeur.findOne({ user: req.auth.user_id })

    const product = new Product({
        ...req.body,
        Vendeur:vendeur._id
    });
    product.save()
        .then(() => res.status(201).json(product))
        .catch(error => res.status(400).json({ error }));
};

exports.getProduct = async (req, res, next) => {

    if (!req.params?._id) {
        const products = await Product.find().populate('category').populate({
            path: 'comments',
            populate: { path: 'replys' }
        });
        res.status(200).json(products)
    }
    else {
        const product = await Product.findOne({ _id: req.params._id }).populate('category').populate({
            path: 'comments',
            populate: { path: 'replys' }
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);

    }
};

exports.updateProduct = (req, res, next) => {
    Product.updateOne({ _id: req.params._id }, { ...req.body, _id: req.params._id })
        .then(() => res.status(200).json({ message: 'updated successfully' }))
        .catch(() => res.status(400).json({ error }));
};

exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({ _id: req.params._id })
        .then(() => res.status(200).json({ message: 'delete avec succes' }))
        .catch(error => res.status(400).json({ error }))
};

exports.verifyProducts = async (productsCmmd) => {
    const products = []
    let verified = true;
    for (const element of productsCmmd) {
        const product = await Product.findOne({ _id: element.product });
        if (!product) {
            verified = false
            break;
        }
        else {
            if (element.qte > product.qte || product.status != 1) {
                verified = false
                break
            }
            else {
                product.qte = element.qte
                products.push(product);
            }
        }
    }
    return { verified, productsCmmd: products }
}

exports.listProducts = async (req, res, next) => {
    let id;
    const products = [];
    for (const element of req.body) {
        if (element.idProduct) {
            id=element.idProduct;
        } else {
            id=element._id
        }
        const prd = await Product.findOne({ _id: id });
        if (!prd) {
            return res.status(404)
        } else {
            products.push(prd);
        }
    }
    return res.status(200).json(products);
}


exports.sellProducts = async (products, res) => {
    for (const p of products) {
        const product = await Product.findOne({ _id: p._id });
        if (p.qte == product.qte) {
            Product.updateOne({ _id: p._id }, { qte: 0, status: 0 })
            .then( () => res.status(200).json({message:'updated successfully'}))
            .catch((error) => res.status(400).json({ error }));
        }
        else {
            Product.updateOne({ _id: p._id }, { qte: product.qte - p.qte, _id: p._id })
            .then( () => res.status(200).json({message:'updated successfully'}))
            .catch((error) => res.status(400).json({ error }));
        }
    }
}

