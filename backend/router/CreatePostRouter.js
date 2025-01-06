const fs = require('fs');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');
const secret = 'asdasfkjowietrk345464mlsfajkm@kjsdakjfk';

const CreatePostRouter = async(req,res) => {
    const { originalname, path } = req.file;
    const paths = originalname.split('.');
    const ext = paths[paths.length-1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);    
    const { token } = req.cookies
    try {
        jwt.verify(token, secret , {}, async (err,info) => {
            if(err) throw err;
            const {title,summary,content} = req.body    
            const PostDoc = await Post.create({
                title,
                summary,
                content,
                cover:newPath,
                author:info.id
            })
        res.json(PostDoc).status(200)
        }) 
    } catch(e) {
        res.json(e).status(400);
    } 
}
module.exports = CreatePostRouter;