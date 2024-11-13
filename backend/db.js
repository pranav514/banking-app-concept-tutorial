const mongoose = require("mongoose");
const {db_url}  = require("./config")
const connectToMongo = async () => {
    try {
      await mongoose.connect(db_url, { useNewUrlParser: true });
      console.log('connected to MongoDB');
    } catch(error) {
      console.log('error connection to MongoDB:', error.message);
    }
  };
  connectToMongo()
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        trim : true,
     },
    password : {
        type : String,
        required : true,
    },
    firstname : {
        type : String,
        required : true,
        trim : true,
    },
    lastname : {
        type : String,
        required : true,
        trim : true,
      
    }
})
const accountSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required  : true
  },
 balance  :{
  type : Number,
  required : true,
 }
})

const User = mongoose.model("User" , userSchema)
const Account = mongoose.model("Account" , accountSchema)

module.exports = {
    User,
    Account,
}