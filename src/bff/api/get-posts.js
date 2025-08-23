import { transformPost } from '../transformers';

export const getPosts = (searchFrase, page, limit) =>
	fetch(`http://localhost:3005/posts?title_like=${searchFrase}&_page=${page}&_limit=${limit}`)
		.then((loadedPosts) =>
			Promise.all([loadedPosts.json(), loadedPosts.headers.get('Link')])
		)
		.then(([loadedPosts, links]) => ({
			posts: loadedPosts && loadedPosts.map(transformPost),
			links,
		}));
