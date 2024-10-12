const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/codeIDE");
const userSchema = {
    name: String,
    username: String,
    email: String,
    password: String,
    date: {
        type: Date,
        default: Date.now
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}
module.exports=mongoose.model("User",userSchema)