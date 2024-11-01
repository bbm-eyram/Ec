import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/order').then((response) => {
      setOrders(response.data);
    });
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`/api/order?id=${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId)); // Remove deleted order from state
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Orders</h1>
      {orders.length > 0 &&
        orders.map((order, index) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Order #{index + 1}</h2>
                <h3 className="text-gray-600 mb-2">Id: {order._id}</h3>
                <h3 className="text-md font-medium mb-2">By: {order.name}</h3>
                <h3 className="text-md font-medium mb-2">Email: {order.email}</h3>
              </div>
              <div>
                <h3 className="text-md font-medium mb-2">state: {order.state}</h3>
                <h3 className="text-md font-medium mb-2">Contact: {order.contact}</h3>
                <h3 className="text-md font-medium mb-2">Address: {order.address}</h3>
                <h3 className="text-md font-medium mb-2">City: {order.city}</h3>
                <h3 className="text-gray-600 mb-2">Zip Code: {order.zip}</h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left">Product</th>
                    <th className="py-2 px-4 text-left">Quantity</th>
                    <th className="py-2 px-4 text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.line_items &&
                    order.line_items.map((product) => (
                      <tr key={product.id}>
                        <td className="py-2 px-4">
                          <img 
                            src={product.price_data?.product_data?.images?.[0]} 
                            alt={product.price_data?.product_data?.name}
                            style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%"}}
                          />
                          {product.price_data?.product_data?.name}
                          </td>
                        <td className="py-2 px-4">{product.quantity}</td>
                        <td className="py-2 px-4">Ghc{(product.price_data?.unit_amount / 100).toFixed(2)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => deleteOrder(order._id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete Order
            </button>
          </div>
        ))}
    </div>
  );
};

export default Orders;
