import express from "express";
import fileDb from "../fileDb";
import {MessageWithoutId} from "../type";
import {imagesUpload} from "../multer";

const postsRouter = express.Router();

postsRouter.get('/', async (req, res) => {
    const posts = await fileDb.getPosts();
    res.send(posts);
});
postsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if (!req.body.author || !req.body.message) {
        return res.status(400).send({error: 'Enter correct data!'});
    }

    const postData: MessageWithoutId = {
        author: req.body.author,
        message: req.body.message,
        image: req.file ? req.file.filename : null,
        datetime: (new Date()).toISOString(),
    };
    const savedPost = await fileDb.addPost(postData);
    res.send(savedPost);
});

export default postsRouter;