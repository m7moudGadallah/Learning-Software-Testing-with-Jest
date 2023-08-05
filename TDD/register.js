const register = async (user = { email, password, confirmPassword }) => {
    const { email, password, confirmPassword } = user;

    if (!email || !password || !confirmPassword) {
        return 400;
    }

    if (password.trim().length < 8 || confirmPassword.trim().length < 8) {
        return 400;
    }
};

module.exports = register;
