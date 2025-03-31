import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Template extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public icon!: string;
  public price!: number;
}

Template.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Template",
    tableName: "templates",
    timestamps: true,
  }
);

export default Template;