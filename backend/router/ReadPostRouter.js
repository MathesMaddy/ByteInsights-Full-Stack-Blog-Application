const Post = require('../models/post');

const ReadPostRouter = async (req,res) => {
    const { id } = req.params
    try {
        const PostDoc = await Post.findById(id).populate('author', ['username']);
        PostDoc.cover = PostDoc.cover.replace(/\\/g,'/');
        res.json(PostDoc);
    } catch(e) {
        res.json(e).status(400);
    }        
}

module.exports = ReadPostRouter;