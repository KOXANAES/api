const sequelize = require('./sequelize')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  nickname: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false }, 
  activationLink: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER', allowNull: false }
});


const Token = sequelize.define('token', {
  user: { type: DataTypes.INTEGER },
  refreshToken: { type: DataTypes.STRING },
});
    
const Card = sequelize.define('card', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
  creationDate: { type: DataTypes.STRING },
  inspectionDate: { type: DataTypes.STRING },
  inspectionDeadline: { type: DataTypes.STRING },
  responsibleWorker: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: 'Не посещено' },
  otherInfo: { type: DataTypes.STRING },
});

const Adress = sequelize.define('adress', {
  id: { type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true, allowNull: false },
  city: { type: DataTypes.STRING },
  street: { type: DataTypes.STRING },
  home: { type: DataTypes.STRING },
  apartment: { type: DataTypes.STRING },
});

const Char = sequelize.define('char', {
  id: { type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true, allowNull: false },
  owner: { type: DataTypes.STRING },
  homeType: {  type: DataTypes.STRING },
  rooms: {  type: DataTypes.STRING },
  APIs: {  type: DataTypes.STRING },
  faultyAPIs: {  type: DataTypes.STRING },
  noBatteryAPIs: {  type: DataTypes.STRING },
  ovens: {  type: DataTypes.STRING },
  faultyOvens: {  type: DataTypes.STRING },
  repairNeededOvens: {  type: DataTypes.STRING },
});

const Residents = sequelize.define('residents', { 
  id: { type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true, allowNull: false },
  name: { type: DataTypes.STRING },
  surname: { type: DataTypes.STRING },
  paternity: { type: DataTypes.STRING },
  birth: { type: DataTypes.STRING },
});

const Violations = sequelize.define('violations', { 
  id: { type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
})

const CardViol = sequelize.define('cardviol', {
  cardId: {
    type: DataTypes.INTEGER,
    references: {
      model: Card,
      key: 'id',
    },
  },
  violationId: {
    type: DataTypes.INTEGER,
    references: {
      model: Violations, 
      key: 'id',
    },
  },
});

Card.hasOne(Adress)
Adress.belongsTo(Card)

Card.hasOne(Char)
Char.belongsTo(Card)

Card.hasMany(Residents);
Residents.belongsTo(Card);

Card.belongsToMany(Violations, {through: CardViol});
Violations.belongsToMany(Card, {through: CardViol});

module.exports = { 
  User,
  Token,
  Card,
  Adress,
  Char,
  Residents,
  Violations,
  CardViol
}