// // models.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../configs/mysql.db');

// // City Model
// const City = sequelize.define('City', {
//   city_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   city_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// // Theatre Model
// const Theatre = sequelize.define('Theatre', {
//   theater_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   city_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   theater_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// // ActiveMovies Model
// const ActiveMovies = sequelize.define('ActiveMovies', {
//   movie_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   movie_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// // Language Model
// const Language = sequelize.define('Language', {
//   language_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   language_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// // Dates Model
// const Dates = sequelize.define('Dates', {
//   date_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   available_date: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
// });

// // Shows Model
// const Shows = sequelize.define('Shows', {
//   show_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   date_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   show_time: {
//     type: DataTypes.TIME,
//     allowNull: false,
//   },
//   theater_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   movie_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   language_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// });

// // Associations
// Theatre.belongsTo(City, { foreignKey: 'city_id' });
// City.hasMany(Theatre, { foreignKey: 'city_id' });

// Shows.belongsTo(Dates, { foreignKey: 'date_id' });
// Shows.belongsTo(Theatre, { foreignKey: 'theater_id' });
// Shows.belongsTo(ActiveMovies, { foreignKey: 'movie_id' });
// Shows.belongsTo(Language, { foreignKey: 'language_id' });

// // Add these associations to indicate one-to-many relationships
// Dates.hasMany(Shows, { foreignKey: 'date_id' });
// Theatre.hasMany(Shows, { foreignKey: 'theater_id' });
// ActiveMovies.hasMany(Shows, { foreignKey: 'movie_id' });
// Language.hasMany(Shows, { foreignKey: 'language_id' });

// module.exports = { City, Theatre, ActiveMovies, Language, Dates, Shows };
