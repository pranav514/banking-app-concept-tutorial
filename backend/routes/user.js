const express = require("express");
const { User } = require("../db");
const {Account} = require("../db")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const zod = require("zod");
const router = express.Router();
const {JWT_SECRET} = require('../config');
const authMiddleware = require("../middlewares/authentication");

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
    firstname: zod.string(),
    lastname: zod.string(),
});
const updateSchema = zod.object({
    password : zod.string().optional(),
    firstname : zod.string().optional(),
    lastname : zod.string().optional(),
})
// Register route
router.post('/register', async (req, res) => {
    try {
   
        const parsedData = signupSchema.parse(req.body);
        const existingUser = await User.findOne({ username: parsedData.username });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(parsedData.password, 10);
        const newUser = new User({
            username: parsedData.username,
            password: hashedPassword,
            firstname: parsedData.firstname,
            lastname: parsedData.lastname,
        });

      
        await newUser.save();
        Account.create({
            userId : newUser.id,
            balance : Math.random() * 10000,
        })
        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        if (error instanceof zod.ZodError) {
            res.status(400).json({ error: error.errors.map(e => e.message) });
        } else {
            res.status(500).json({ error: "An error occurred during registration" });
        }
    }
});

router.post('/login', async (req, res) => {
    try {
       
        const parsedData = signupSchema.pick({ username: true, password: true }).parse(req.body);


        const user = await User.findOne({ username: parsedData.username });
        if (!user) {
            return res.status(401).json({ error: "User not registered" });
        }


        const passMatch = await bcrypt.compare(parsedData.password, user.password);
        if (!passMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }


        const token = jwt.sign({ userId : user._id }, JWT_SECRET);
        res.status(200).json({ message: "User logged in", token , user : user._id , firstname : user.firstname });
    } catch (error) {
        if (error instanceof zod.ZodError) {
            res.status(400).json({ error: error.errors.map(e => e.message) });
        } else {
            res.status(500).json({ error: "An error occurred during login" });
        }
    }
});

router.put('/update/:id' , authMiddleware ,async(req , res) => {
    const parsedData = updateSchema.pick({password : true ,firstname : true , lastname : true}).parse(req.body);
    if(parsedData.password){
     parsedData.password =  await bcrypt.hash(parsedData.password, 10);

    }


    const id = req.params.id;
    console.log({parsedData , id})
    try {
        const user = await User.findByIdAndUpdate(id, parsedData, { new: true });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" , firstname : user.firstname });
    }catch (error) {
        if (error instanceof zod.ZodError) {
            res.status(400).json({ error: error.errors.map(e => e.message) });
        } else {
            res.status(500).json({ error: "An error occurred during update" });
        }
    }
 
})

router.get('/search' , authMiddleware ,async (req , res) => {
    const filter = req.query.filter || "";

    const userId = req.userId;

    const users = await User.find({
        _id: { $ne: userId }, 
    
        $or : [{
            firstname : {
                "$regex" : filter
            }
        } , {
            lastname : {
                "$regex" : filter
            }
        }]
    })
    res.json({
        user : users.map(user => ({
            username : user.username,
            firstName : user.firstname,
            lastName : user.lastname,
            _id : user._id
        }))
    })
})

module.exports = router;
