import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./user.model"; // Assuming this exists
import Template from "./template";

class Cart extends Model {
  public id!: number;
  public userId!: number;
  public templateId!: number;
  public quantity!: number;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    templateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "templates",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "Cart",
    tableName: "cart",
    timestamps: true,
  }
);

// Relationships
User.hasMany(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });
Template.hasMany(Cart, { foreignKey: "templateId" });
Cart.belongsTo(Template, { foreignKey: "templateId" });

export default Cart;