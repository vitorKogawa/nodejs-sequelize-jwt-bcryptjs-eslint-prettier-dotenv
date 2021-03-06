require("./env.config");

module.exports = {
  username: process.env.MYSQL_DEV_USERNAME,
  password: process.env.MYSQL_DEV_PASSWORD,
  database: process.env.MYSQL_DEV_DATABASE,
  host: process.env.MYSQL_DEV_HOSTNAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};

// module.exports = {
//   development: {
//     username: process.env.MYSQL_DEV_USERNAME,
//     password: process.env.MYSQL_DEV_PASSWORD,
//     database: process.env.MYSQL_DEV_DATABASE,
//     host: process.env.MYSQL_DEV_HOSTNAME,
//     dialect: "mysql",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//     define: {
//       timestamp: true,
//       underscored: true,
//       underscoredAll: true,
//     },
//   },

//   test: {
//     username: "",
//     password: "",
//     database: "",
//     host: "",
//     dialect: "",
//     pool: {
//       max: "",
//       min: "",
//       acquire: "",
//       idle: "",
//     },
//     define: {
//       timestamp: "",
//       underscored: "",
//       underscoredAll: "",
//     },
//   },

//   production: {
//     username: "",
//     password: "",
//     database: "",
//     host: "",
//     dialect: "",
//     pool: {
//       max: "",
//       min: "",
//       acquire: "",
//       idle: "",
//     },
//     define: {
//       timestamp: "",
//       underscored: "",
//       underscoredAll: "",
//     },
//   },
// };
