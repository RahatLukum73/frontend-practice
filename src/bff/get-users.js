export const getUsers = () =>
	fetch('http://localhost:3005').then((loadedUsers) =>
		loadedUsers.json()
	);
