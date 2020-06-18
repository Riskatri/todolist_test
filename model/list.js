module.exports = (sequelize, Sequelize) => {
    const List = sequelize.define("lists", {
        nameList: {
            type: Sequelize.STRING
        },
        colorHexList: {
            type: Sequelize.STRING
        },
        statusList: {
            type: Sequelize.BOOLEAN
        }
    });
    return List;
}