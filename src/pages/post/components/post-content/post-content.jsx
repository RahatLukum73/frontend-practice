import { SpecialPanel } from '../special-panel/special-panel';
import { H2, Icon } from '../../../../components';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			{imageUrl && <img src={imageUrl} alt={title} />}
			<H2>{title}</H2>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="-20px 0 20px"
				editButton={
					<Icon
						id="fa-pencil-square-o"
						size="21px"
						margin="0 10px 0 0"
						onClick={() => navigate(`/post/${id}/edit`)}
					/>
				}
			/>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		margin: 0 15px 0 0;
		float: left;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`;
