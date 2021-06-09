const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
require("./database/connection/conn");
const Userdata = require("./database/model/user");
app.use(express.urlencoded( { extended: true }));
app.use(express.json());
const view_path = path.join(__dirname,"./templates/views");
console.log(view_path);
const partials_path = path.join(__dirname,"./templates/partials");
app.set("view engine", "hbs");
app.set("views", view_path);
hbs.registerPartials(partials_path);
app.use(require("./router/router"));


app.post("/register",async (req,res) => {
    const{firstname, lastname, username, email, password, cpassword} = req.body;
    const data = await Userdata.findOne({username});
    if(data){
        res.status(201).send("already register");
    }else{
        if(password === cpassword){
         const modeldata = await new Userdata({
             firstname,lastname,username,email,password,cpassword
         })

         const token = await modeldata.generateToken();
        await modeldata.save();
         res.render("login")
        }else{
            res.send("password not match");
        }
    }

    
})
app.post("/login", async (req,res) => {
    const{username,password} = req.body;
    const user = await Userdata.findOne({username});
    
    if(user){
        if(username === user.username){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const token = await user.generateToken();
                await token.save();
                res.render("index");
            }else{
                res.send("invalid password");
            }
        }else{
            res.send("invalid username");
        }
    }else{
        res.send("please first register");
    }
})
app.listen(port,() => {
    console.log(`listenning port is ${port}`);
})