const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
   
    firstname: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 10
    },
    lastname: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 10
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 2,
        maxLength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 12
    },
    cpassword: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 12
    },
    tokens: [{
        token:{
            type: String,
            required: true,
            unique: true
        }
    }]
    
})

userSchema.methods.generateToken = async function(){
    try{
    const token = await jwt.sign({username: this.username}, 
        "kishansorathiyakishansorathiyakishansorathiyakishansorathiyakishansorathiya")
        console.log(token);
    
    this.tokens = this.tokens.concat({token: token})

        return token;
    }catch(e) {
        console.log(e);
    }
        // next();
}

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword,12);
    next();
})

const Userdata = new mongoose.model("Userdata" , userSchema);

module.exports = Userdata;