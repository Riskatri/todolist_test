module.exports = (sequelize, Sequelize) => {
    const ListItem = sequelize.define('listItems', {
        nameListItem: {
            type: Sequelize.STRING
        },
        descListItem: {
            type: Sequelize.STRING
        },
        isDoneListItem: {
            type: Sequelize.INTEGER
        }
    });
    return ListItem;
 }