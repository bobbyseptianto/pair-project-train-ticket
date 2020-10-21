'use strict';

const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {

    const dataUsers = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
    dataUsers.map(data => {
      data['createdAt'] = new Date();
      data['updatedAt'] = new Date();
    });

    return queryInterface.bulkInsert("Users", dataUsers, {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete("Users", null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
