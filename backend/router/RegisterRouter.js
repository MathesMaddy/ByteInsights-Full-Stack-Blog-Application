const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync(10);

const User = require('../models/user');

const RegisterRouter = async (req,res) => {
    try {
        const { username, email, password } = req.body;
        const UserDoc = await User.create({
            username,
            email, 
            password: bcryptjs.hashSync(password,salt) 
        })        
        res.json(UserDoc);
    }
    catch(e) {
        res.status(400).json(e)
    }
}

module.exports = RegisterRouter;