module.exports = function (user) {
	return {
		id: user.id,
		////id: user._id ? user._id.toString() : user.id,
		login: user.login,
		roleId: user.role,
		//createdAt: user.createdAt,
		createdAt: user.createdAt ? new Date(user.createdAt).toLocaleDateString('ru-RU') : user.createdAt,
	};
};
