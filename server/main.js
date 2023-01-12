const express=require('express');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const port=8000;
const lcase = "abcdefghijklmnopqrstuvwxyz";
const ucase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const sym = "!@#$%&";
const num = "0123456789";

app.post('/genPass',(req,res) =>{
    let para=req.body;
    let set="";
    if(para.lcase) set+=lcase;
    if(para.ucase) set+=ucase;
    if(para.num) set+=num;
    if(para.sym) set+=sym;

    let password="";
    let n=set.length;
    for(let i=0;i<para.len;i++){
        password+=set[Math.floor(Math.random() * n)];
    }
    if(password.length) res.send(password);
});
app.post('/createAcc',(req,res) =>{
    let creds=req.body;

});

app.listen((port),()=>{
    console.log(`Server Running at http://localhost:${port}`)
})

// npx nodemon main.js