import { useRef, useState, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon, Input } from '../../../../components';
import { sanitizeContent } from './utils';
import { SpecialPanel } from '../special-panel/special-panel';
import { savePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import styled from 'styled-components';

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [imageUrl, title]);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			})
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);

	const onTitleChange = ({ target }) => setTitleValue(target.value);

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				placeholder="Изображение..."
				onChange={onImageChange}
				padding="0 10px"
			/>
			<Input
				value={titleValue}
				placeholder="Заголовок..."
				onChange={onTitleChange}
				padding="0 10px"
			/>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="10px 0 20px"
				editButton={<Icon id="fa-floppy-o" size="21px" onClick={onSave} />}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		margin: 0 15px 0 0;
		float: left;
	}

	& .post-text {
		min-height: 80px;
		border: 1px solid #000;
		border-radius: 5px;
		font-size: 18px;
		margin: 10px 0 0 0;
		padding: 10px 10px;
		white-space: pre-line;
	}
`;
