const jwt = require('jsonwebtoken');
const secret = 'asdasfkjowietrk345464mlsfajkm@kjsdakjfk';

const ProfileRouter = (req,res) => {
    const { token } = req.cookies
    try {
        jwt.verify(token, secret , {}, (err,info) => {
            if(err) throw err;
            res.json(info)
        })
    } catch(err) {
        res.clearCookie('token').status(400).json('Wrong credentials');
    }    
}
module.exports = ProfileRouter;