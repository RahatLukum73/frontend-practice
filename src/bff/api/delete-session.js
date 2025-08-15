export const deleteSession = async (hash) => 

	fetch(`http://localhost:3005/sessions/${hash}`, {
		method: 'DELETE',
	});
