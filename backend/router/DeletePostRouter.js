const Post = require('../models/post');

const DeletePostRouter = async(req, res) => {
    const { id } = req.params
    try {
        const PostDoc = await Post.findByIdAndDelete(id);
        res.json(PostDoc).status(200);
    } catch(e) {
        res.json(e).status(400);
    }
}
module.exports = DeletePostRouter;