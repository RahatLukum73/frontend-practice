const express = require('express');
const path = require('path');
const { getPosts, getPost, addPost, editPost, deletePost } = require('../controllers/post.js');
const { addComment, deleteComment } = require('../controllers/comment.js');
const authenticated = require('../middlewares/authenticated.js');
const hasRole = require('../middlewares/hasRole.js');
const mapPost = require('../helpers/mapPost.js');
const mapComment = require('../helpers/mapComment.js');
const ROLES = require('../constants/roles.js');
const handleUpload = require('../middlewares/upload.js');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	const { posts, lastPage } = await getPosts(req.query.search, req.query.limit, req.query.page);

	res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

router.get('/:id', async (req, res) => {
	const post = await getPost(req.params.id);

	res.send({ data: mapPost(post) });
});

router.post('/:id/comments', authenticated, async (req, res) => {
	const newComment = await addComment(req.params.id, {
		content: req.body.content,
		author: req.user.id,
	});

	res.send({ data: mapComment(newComment) });
});

router.delete(
	'/:postId/comments/:commentId',
	authenticated,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		await deleteComment(req.params.postId, req.params.commentId);

		res.send({ error: null });
	},
);

router.post('/', authenticated, hasRole([ROLES.ADMIN]),handleUpload, async (req, res) => {
	try {
		const newPost = await addPost({
			title: req.body.title,
			content: req.body.content,
			image: req.body.imageUrl,
		});
		res.send({ data: mapPost(newPost) });
	} catch (error) {
		console.log('Request body:', req.body)
		res.status(500).json({ error: error.message });
	}
});

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), handleUpload, async (req, res) => {
	try {
		const updateData = {
			title: req.body.title,
			content: req.body.content,
		};

		if (req.uploadedFile) {
			updateData.image = req.body.imageUrl;
		}

		const updatedPost = await editPost(req.params.id, updateData);
		res.send({ data: mapPost(updatedPost) });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	await deletePost(req.params.id);

	res.send({ error: null });
});

module.exports = router;
