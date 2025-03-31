import { Response } from "express";
import Cart from "../models/cart";
import Template from "../models/template";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export const getCart = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "❌ Unauthorized" });
      return;
    }
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Template, attributes: ["id", "title", "description", "icon", "price"] }],
    });
    const formattedCart = cartItems.map((item) => ({
      id: item.templateId,
      title: item.Template?.title,
      description: item.Template?.description,
      icon: item.Template?.icon,
      price: item.Template?.price,
      quantity: item.quantity,
    }));
    res.status(200).json(formattedCart);
  } catch (error) {
    console.error("❌ Error fetching cart:", error);
    res.status(500).json({ message: "❌ Server error" });
  }
};

// addToCart and removeFromCart remain as previously fixed
export const addToCart = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { templateId, quantity = 1 } = req.body;

    if (!userId) {
      res.status(401).json({ message: "❌ Unauthorized" });
      return;
    }
    if (!templateId || quantity < 1) {
      res.status(400).json({ message: "❌ Invalid templateId or quantity" });
      return;
    }

    const template = await Template.findByPk(templateId);
    if (!template) {
      res.status(404).json({ message: "❌ Template not found" });
      return;
    }

    let cartItem = await Cart.findOne({ where: { userId, templateId } });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userId, templateId, quantity });
    }

    res.status(200).json({ message: "✅ Added to cart" });
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    res.status(500).json({ message: "❌ Server error" });
  }
};

export const removeFromCart = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const templateId = parseInt(req.params.id);

    if (!userId) {
      res.status(401).json({ message: "❌ Unauthorized" });
      return;
    }
    if (isNaN(templateId)) {
      res.status(400).json({ message: "❌ Invalid templateId" });
      return;
    }

    const cartItem = await Cart.findOne({ where: { userId, templateId } });
    if (!cartItem) {
      res.status(404).json({ message: "❌ Item not found in cart" });
      return;
    }

    await cartItem.destroy();
    res.status(200).json({ message: "✅ Removed from cart" });
  } catch (error) {
    console.error("❌ Error removing from cart:", error);
    res.status(500).json({ message: "❌ Server error" });
  }
};