import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db"; // Import your Sequelize instance

// Define attributes for OTP model
interface OTPAttributes {
  id: number;
  email: string;
  otp: string;
  otpExpires: Date;
}

// Optional fields for OTP creation (id auto-incremented)
interface OTPCreationAttributes extends Optional<OTPAttributes, "id"> {}

// Define Sequelize Model
class OTP extends Model<OTPAttributes, OTPCreationAttributes> implements OTPAttributes {
  public id!: number;
  public email!: string;
  public otp!: string;
  public otpExpires!: Date;
}

// Initialize the OTP model
OTP.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otpExpires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "otp",
    timestamps: false, // Disable createdAt and updatedAt fields
  }
);

export default OTP;
