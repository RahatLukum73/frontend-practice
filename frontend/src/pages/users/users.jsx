import { PrivateContent, H2 } from '../../components';
import { UserRow, TableRow } from './components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkAccess } from '../../utils';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constans/role';
import styled from 'styled-components';
import { request } from '../../utils/request';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		Promise.all([
			request('/users'),
			request('/users/roles'),
		]).then(([usersdata, rolesdata]) => {
			if (usersdata.error || rolesdata.error) {
				setErrorMessage(usersdata.error || rolesdata.error);
				return;
			}
			setUsers(usersdata.data);
			setRoles(rolesdata.data);
		});
	}, [shouldUpdateUserList, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		request(`/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="registered-at-column">Дата регистрации</div>
						<div className="role-column">Роль</div>
					</TableRow>
					{users.map(({ id, login, createdAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							createdAt={createdAt}
							roleId={roleId}
							roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</div>
		</PrivateContent>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	width: 570px;

	}
`;
