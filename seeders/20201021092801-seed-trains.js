'use strict';

const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {

    const dataTrains = JSON.parse(fs.readFileSync("./data/trains.json", "utf8"));
    dataTrains.map(data => {
      data['createdAt'] = new Date();
      data['updatedAt'] = new Date();
    });

    return queryInterface.bulkInsert("Trains", dataTrains, {});

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

    return queryInterface.bulkDelete("Trains", null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
