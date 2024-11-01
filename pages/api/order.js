import { mongooseConnect } from "../../lib/mongoose";
import { Order } from "../../models/Order";

export default async function handler(req, res) {
  await mongooseConnect();

  const { method } = req;

  if (method === 'DELETE') {
    const { id } = req.query; // Get the order ID from the query
    console.log('Received ID:', id);

    try {
      if (!id) {
        return res.status(400).json({ error: 'Order ID is required' });
      }

      const deletedOrder = await Order.findByIdAndDelete(id);
      if (!deletedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete order' });
    }
  } else if (method === 'GET') {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json(orders);
  } else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}
