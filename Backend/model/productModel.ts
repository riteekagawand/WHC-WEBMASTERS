import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/dbConfig"; // Import your Sequelize instance

// Define the attributes for the Product model
interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Define attributes where some fields (like `id`) are optional during creation
interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

// Define the Product model class
class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public imageUrl!: string;

  // Timestamps (optional, if your table has createdAt/updatedAt)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT, // Use FLOAT or DECIMAL for prices
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "image_url", // Map to the column name in your DB
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    tableName: "products", // Table name in the database
    timestamps: true, // Set to false if you don’t want createdAt/updatedAt
    underscored: true, // Use snake_case for column names (e.g., image_url)
  }
);

// Export the model and the create function
export default Product;

export const createProduct = async (
  name: string,
  description: string,
  price: number,
  imageUrl: string
): Promise<Product> => {
  const product = await Product.create({
    name,
    description,
    price,
    imageUrl,
  });
  return product;
};