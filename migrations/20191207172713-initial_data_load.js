'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.bulkInsert('items', [{
        item: 'Xbox',
        category: 'Fun',
        isAvailable: '0',
        description: 'A video game console developed by Microsoft'
      },
      {
        item: 'Telescope',
        category: 'Fun',
        isAvailable: '1'
      },
      {
        item: 'Puzzles',
        category: 'Fun',
        isAvailable: '0'
      },
      {
        item: 'Microscope',
        category: 'Fun',
        isAvailable: '1'
      },
      {
        item: 'Lego',
        category: 'Fun',
        isAvailable: '0'
      },
      {
        item: 'Playstation',
        category: 'Fun',
        isAvailable: '1'
      },
      {
        item: 'ipad',
        category: 'Tech',
        isAvailable: '1'
      },
      {
        item: 'Amazon Echo',
        category: 'Tech',
        isAvailable: '0'
      },
      {
        item: 'Raspberry Pi',
        category: 'Tech',
        isAvailable: '1'
      },
      {
        item: 'Roku',
        category: 'Tech',
        isAvailable: '1'
      },
      {
        item: 'Google Home',
        category: 'Tech',
        isAvailable: '0'
      },
      {
        item: 'Ladder',
        category: 'Tools',
        isAvailable: '1'
      },
      {
        item: 'Electric Drill',
        category: 'Tools',
        isAvailable: '1'
      },
      {
        item: 'Bicycle Pump',
        category: 'Tools',
        isAvailable: '1'
      },
      {
        item: 'Car battery jumpstarter',
        category: 'Tools',
        isAvailable: '1'
      },
      {
        item: 'Complete toolset',
        category: 'Tools',
        isAvailable: '1'
      },
      {
        item: 'Paper Shredder',
        category: 'Tools',
        isAvailable: '1'
      },
      {
        item: 'Garden tools',
        category: 'Tools',
        isAvailable: '1'
      },
      {
        item: 'Cookie cutter',
        category: 'Home',
        isAvailable: '0'
      },
      {
        item: 'Cake pans',
        category: 'Home',
        isAvailable: '0'
      },
      {
        item: 'Sewing Machine',
        category: 'Home',
        isAvailable: '1'
      },
      {
        item: 'Knitting items',
        category: 'Home',
        isAvailable: '1'
      },
      {
        item: 'Food Processor',
        category: 'Home',
        isAvailable: '1'
      },
      {
        item: 'Blender',
        category: 'Home',
        isAvailable: '0'
      }
    ])

    /*return queryInterface.bulkInsert('users', [{
      firstName: "Patrick",
      lastName: "O'Connor",
      email: "poc.967@gmail.com",
      password: "HelloWorld!"
    }])*/
  },

  down: async (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('items')
    //return queryInterface.bulkDelete('users')
  }
};