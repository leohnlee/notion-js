const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const Document = require('./document');

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize; //db 연동

db.Document = Document;
Document.init(sequelize);

// Document.associate(db);

module.exports = db; //db라는 json 배열을 exports