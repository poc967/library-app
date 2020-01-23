const Items = (connection, Sequelize) => {
    return connection.define('items', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        item: {
            type: Sequelize.STRING,
        },
        category: {
            type: Sequelize.ENUM('Fun', 'Tech', 'Tools', 'Home'),
        },
        isAvailable: {
            type: Sequelize.BOOLEAN,
        },
        checkedOutBy: {
            type: Sequelize.STRING,
            reference: {
                model: 'users',
                key: 'id'
            },
            allowNull: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
    }, {
        paranoid: true
    })
}

module.exports = Items