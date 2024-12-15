// pages/api/order/place.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/sanity/lib/client'; // Adjust the import based on your project structure

interface OrderRequestBody {
  cartItems: [string, number]; // Adjust the type based on your cart item structure
  totalAmount: number;
  paymentMethod: string;
  customerName: string;
  email: string;
  address: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { cartItems, totalAmount, paymentMethod, customerName, email, address }: OrderRequestBody = req.body;

    try {
      // Create a new order document in Sanity
      const order = {
        _type: 'order',
        customerName,
        email,
        address,
        cartItems,
        totalAmount,
        paymentMethod,
        status: 'pending', // Initial status
      };

      await client.create(order);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ success: false, message: 'Error placing order' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}