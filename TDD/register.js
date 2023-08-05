const register = async (user= {email, password, confirmPassword}) => {
    const {email, password, confirmPassword} = user;

    if (!email || !password || !confirmPassword) {
        return 400;
    }
};

module.exports = register;