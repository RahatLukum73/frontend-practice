import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../../../../../hooks';
import { Icon } from '../../../../../../components';
import {
	openModal,
	CLOSE_MODAL,
	removeCommentAsync,
} from '../../../../../../actions';
import { selectUserRole } from '../../../../../../selectors';
import { ROLE } from '../../../../../../constans';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CommentContainer = ({
	className,
	postId,
	id,
	author,
	publishedAt,
	content,
}) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			})
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole)

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon id="fa-user-circle-o" inactive={true} size="18px" margin="0 5px 0 0" />
						{author}
					</div>
					<div className="published-at">
						<Icon id="fa-calendar-o" inactive={true} size="18px" margin="0 5px 0 0" />
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && <Icon
				id="fa-trash-o"
				size="21px"
				margin="0 0 0 10px"
				onClick={() => onCommentRemove(id)}
			/>}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin: 10px 0 0 0;

	& .comment {
		border: 1px solid #000;
		width: 100%;
		padding: 5px 10px;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
		align-items: center;
	}

	& .published-at {
		display: flex;
		align-items: center;
	}
`;

Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
}