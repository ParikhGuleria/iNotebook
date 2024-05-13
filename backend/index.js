const connectToMongo=require('./db');
const express=require('express');
var cors=require('cors');

connectToMongo();
const app=express();
const port=5000;

//to access this host from another host:
app.use(cors());

//use middleware to access req.body:
app.use(express.json());

//Use routes to set route :
app.use('/auth',require('./routes/auth'));
app.use('/notes',require('./routes/notes'));



app.listen(port,()=>{
 console.log(`INotebook backend: http://localhost:${port}`);
});

