const express = require("express");
const { User } = require("../db");
const {Account} = require("../db")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const zod = require("zod");
const router = express.Router();
const JWT_SECRET = require('../config');
const authMiddleware = require("../middlewares/authentication");
const { default: mongoose } = require("mongoose");

router.get('/balance' , authMiddleware , async (req,res) => {
    const account = await Account.findOne({userId : req.userId});
    res.json({
        balance : account.balance,
        userId : account.userId
    })
})


router.post('/transfer' , authMiddleware , async (req , res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount , to} = req.body;
    console.log(req.userId)
    const account = await Account.findOne({userId : req.userId}).session(session)
    console.log(account)
    if(!account || account.balance < amount){
        return res.status(400).json({error :"insufficient balance"})
    }
    const toAccount = await Account.findOne({userId : to}).session(session);
    if(!toAccount){
        return res.status(400).json({error :"cannot find the reciver "})
    }
    await Account.updateOne({userId : req.userId} , {$inc : {balance : -amount}}).session(session);
    await Account.updateOne({userId : to} , {$inc  :{balance : amount}}).session(session);
    await session.commitTransaction();
    res.json({
        message : "transfer successful"  , balance_sender : account.balance , balance_reciver : toAccount.balance
    })
})
module.exports = router;