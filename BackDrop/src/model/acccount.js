import { DataTypes, Model } from "sequelize";
import sequelize from "./db.js";

class Account extends Model {}

Account.init({
  accountName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bankCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
}, {
  sequelize,
  modelName: 'account'
})

export default Account;
