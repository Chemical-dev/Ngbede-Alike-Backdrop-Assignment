import { Sequelize } from "sequelize";
const sequelize = new Sequelize('backdropdb', 'account', 'pass', {
  dialect:'sqlite',
  host:'./dev.sqlite',
  logging: false,
})

export default sequelize;