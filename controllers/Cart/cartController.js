import Cart from '../../schemas/cartSchema.js';
import Product from '../../schemas/productSchema.js';

export const createCartItem = async (req, res) => {
    const user = req.user;
    const { incomingPId } = req.params;

    try {
        const product = await Product.findById(incomingPId);
        if (!product) {
            return res.status(400).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ userId: user._id });

        if (!cart) {
            // Create new cart with one product
            cart = new Cart({
                userId: user._id,
                products: [{ productId: incomingPId, quantity: 1 }]
            });
        } else {
            // Check if product already exists in cart
            const productIndex = cart.products.findIndex(
                item => item.productId.toString() === incomingPId
            );

            if (productIndex > -1) {
                // Product exists, increment quantity
                cart.products[productIndex].quantity++;
            } else {
                // Product doesn't exist, push new
                cart.products.push({ productId: incomingPId, quantity: 1 });
            }
        }

        await cart.save();
        res.status(200).json({ message: 'Cart updated successfully', cart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
