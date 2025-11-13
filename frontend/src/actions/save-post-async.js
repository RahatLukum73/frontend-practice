import { request } from '../utils/request';
import { setPostData } from './set-post-data';

// export const savePostAsync = (newPostData) => (dispatch) =>
// 	request('/posts', 'POST', newPostData).then((updatedPost) => {
// 		dispatch(setPostData(updatedPost.data));
// 		return updatedPost.data;
// 	});
export const savePostAsync = (id, newPostData) => (dispatch) => {
	console.log('Sending data:', newPostData);
	const saveRequest = id
		? request(`/posts/${id}`, 'PATCH', newPostData)
		: request('/posts', 'POST', newPostData);

	return saveRequest
		.then((response) => {
			if (response.error) {
				throw new Error(response.error);
			}
			dispatch(setPostData(response.data));
			return response.data;
		})
		.catch((error) => {
			console.error('Save error', error);
			throw error;
		});
};