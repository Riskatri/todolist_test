module.exports = (sequelize, Sequelize) => {
    const User = sequelize('users', {
       
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }

    });
    return User;
}