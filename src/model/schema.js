const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/mysql.db");

const City = sequelize.define("City", {
  city_id: {
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
  },
  city_name:{
    type:DataTypes.STRING,
    allowNull:false
  }
},{
  tableName: 'city', // Specify the table name in lowercase
  timestamps: false,
});

const Theatre = sequelize.define('theatre',{
  theater_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'city',
      key: 'city_id',
    },
  },
  theater_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  tableName: 'theatre', // Specify the table name in lowercase
  timestamps: false,

})


const ActiveMovies = sequelize.define('active_movie', {
  movie_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movie_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  tableName: 'active_movies', // Specify the table name in lowercase
  timestamps: false,

});

const Language = sequelize.define('language', {
  language_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  language_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  tableName: 'language', // Specify the table name in lowercase
  timestamps: false,

});


const Dates = sequelize.define('dates', {
  date_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  available_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},{
  tableName:'dates',
  timestamps: false,

});

const Shows = sequelize.define('shows', {
  show_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'dates',
      key: 'date_id',
    },
  },
  show_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  theater_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'theatre',
      key: 'theater_id',
    },
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'active_movie',
      key: 'movie_id',
    },
  },
  language_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'language',
      key: 'language_id',
    },
  },
},
{
  tableName:"shows",
  timestamps: false,

});

Theatre.belongsTo(City, { foreignKey: 'city_id', targetKey: 'city_id', as: 'City' });
City.hasMany(Theatre,{foreignKey:"city_id"})

Shows.belongsTo(Dates,{foreignKey:"date_id"})
Shows.belongsTo(Language,{foreignKey:"language_id"})
Shows.belongsTo(Theatre,{foreignKey:"theater_id"})
Shows.belongsTo(ActiveMovies,{foreignKey:"movie_id"})

Dates.hasMany(Shows, { foreignKey: 'date_id' });
Theatre.hasMany(Shows, { foreignKey: 'theater_id' });    
ActiveMovies.hasMany(Shows, { foreignKey: 'movie_id' });  
Language.hasMany(Shows, { foreignKey: 'language_id' });

// After defining all associations, add the following lines
console.log(Theatre.associations);
console.log(ActiveMovies.associations);
console.log(Shows.associations);


ActiveMovies.belongsToMany(Theatre, { through: "Shows" });
Theatre.belongsToMany(ActiveMovies, { through: "Shows"});

module.exports = { City, Theatre, ActiveMovies, Language, Dates, Shows }; 