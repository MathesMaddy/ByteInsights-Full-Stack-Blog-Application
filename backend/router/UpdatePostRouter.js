const fs = require('fs');
const secret = 'asdasfkjowietrk345464mlsfajkm@kjsdakjfk';
const Post = require('../models/post');
const jwt = require('jsonwebtoken');

const updatedPostRouter = async (req,res) => {
    let newPath = null;

    if(req.file) {
        const { originalname, path } = req.file;
        const paths = originalname.split('.');
        const ext = paths[paths.length-1];
        newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies

    try {
        jwt.verify(token, secret , {}, async (err,info) => {
            if(err) throw err;            
            const { id, title, summary, content} = req.body              
            const PostDoc = await Post.findById(id);            
            const isAuthor = JSON.stringify(PostDoc.author) === JSON.stringify(info.id)  
            if(!isAuthor)
                return res.status(400).json('you are not the author.')
        
            const updatedPost = await Post.findOneAndUpdate(
                {_id: id},    
                {$set: {
                        title,
                        summary,
                        content,
                        cover: newPath ? newPath : PostDoc.cover
                    }   
                },
                {new: true}
            );

        res.json(PostDoc).status(200);
        }) 
    } catch(e) {
        res.json(e).status(400);
    }     
}

module.exports = updatedPostRouter;