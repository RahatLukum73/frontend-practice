import {
	updateUserRole,
	authorize,
	logout,
	register,
	fetchUsers,
	fetchRoles,
	removeUser,
} from './operations';

export const server = {
	authorize,
	logout,
	register,
	fetchUsers,
	fetchRoles,
	updateUserRole,
	removeUser,
};
