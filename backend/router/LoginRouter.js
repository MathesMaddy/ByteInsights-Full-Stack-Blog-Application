
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secret = 'asdasfkjowietrk345464mlsfajkm@kjsdakjfk';
const LoginRouter = async (req,res) => {
    try {
        const { email, password } = req.body;
        const UserDoc = await User.findOne({email});
        const passOk = await bcryptjs.compareSync(password,UserDoc.password);         
        if(passOk) {    
             jwt.sign({email, id: UserDoc._id, username: UserDoc.username}, secret, {},(err,token) => {
                if(err) throw err
                res.cookie('token',token, {
                    httpOnly: true,                    
                    sameSite: 'None',
                }).json({
                    id:UserDoc._id,
                    email,
                    username: UserDoc.username,
                }).status(200)
            })
        } else{
            res.status(400).json('Wrong credentials');
        }           
    }
    catch(e){
        res.status(400).json(e);
    }
}
module.exports = LoginRouter;
