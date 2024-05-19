const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cors=require('cors');

const authRouter=require('./Routes/auth')
const roleRouter=require('./Routes/role')
const categoryRouter=require('./Routes/category')
const productRouter=require('./Routes/product')
const commentRouter=require('./Routes/comment')
const commandRouter=require('./Routes/command')
const vendeurRouter=require('./Routes/vendeur')
const adminRouter=require('./Routes/admin')
const clientRouter=require('./Routes/client')
const userRouter=require('./Routes/user')

const authenticate=require('./middleware/authenticate')
const authorize=require('./middleware/authorize')


mongoose.connect('mongodb+srv://louuu:azertytreza@test.ngqlkz4.mongodb.net/?retryWrites=true&w=majority&appName=test')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());
const corsOpts = {
  origin: '*',
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
  ],

  allowedHeaders: [
    ['Content-Type', 'Authorization']
  ],
};
app.use(cors(corsOpts));

app.use('/api/auth', authRouter);
app.use('/api/role', roleRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/comment',authenticate, commentRouter);
app.use('/api/cmmd',authenticate, commandRouter);
app.use('/api/vendeur',authenticate,authorize(["Admin"]), vendeurRouter);
app.use('/api/client',authenticate,authorize(["Admin"]), clientRouter);
app.use('/api/admin',authenticate, adminRouter);
app.use('/api/user',authenticate, userRouter);

app.use((req, res) => {
    res.json({ message: "serveur works" });
  });
  
  
  module.exports = app;