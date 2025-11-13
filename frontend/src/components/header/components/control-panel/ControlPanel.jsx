import { Icon, Button } from '../../..';
import { Link, useNavigate } from 'react-router-dom';
import { ROLE } from '../../../../constans/role';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectUserRole,
	selectUserLogin,
} from '../../../../selectors';
import { logout } from '../../../../actions';
import { checkAccess } from '../../../../utils';
import styled from 'styled-components';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const UserName = styled.div`
	font-size: 16px;
	font-weight: bold;
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: -3px 0 0 0;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<Wrapper>
						<UserName>{login}</UserName>
						<Icon id="fa-sign-out" margin=" 0 0 0 10px" onClick={onLogout} />
					</Wrapper>
				)}
			</RightAligned>
			<RightAligned>
				<Icon
					id="fa-backward"
					margin="10px 0 0 0"
					onClick={() => navigate(-1)}
				/>
				{isAdmin && (
					<>
						<Link to="/post">
							<Icon id="fa-file-text-o" margin="10px 0 0 15px" />
						</Link>
						<Link to="/users">
							<Icon id="fa-users" margin="10px 0 0 15px" />
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
