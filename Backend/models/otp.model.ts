import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db"; // Import your Sequelize instance

// Define attributes for OTP model
interface OTPAttributes {
  id: number;
  email: string;
  otp: string;
  otp_expires: Date; // ✅ Fixed field name
}

// Optional fields for OTP creation (id auto-incremented)
interface OTPCreationAttributes extends Optional<OTPAttributes, "id"> {}

// Define Sequelize Model
class OTP extends Model<OTPAttributes, OTPCreationAttributes> implements OTPAttributes {
  public id!: number;
  public email!: string;
  public otp!: string;
  public otp_expires!: Date; // ✅ Updated field name
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
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp_expires: { // ✅ Fixed field name
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "otps",
    timestamps: false, // Disable createdAt and updatedAt fields
  }
);

export default OTP;
