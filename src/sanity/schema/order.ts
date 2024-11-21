const oders= {
    name: "order",
    title: "Order",
    type: "document",
    fields: [
      {
        name: "customerName",
        title: "Customer Name",
        type: "string",
      },
      {
        name: "email",
        title: "Email",
        type: "string",
      },
      {
        name: "address",
        title: "Address",
        type: "string",
      },
      {
        name: "cartItems",
        title: "Cart Items",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              { name: "productId", title: "Product ID", type: "string" },
              { name: "name", title: "Product Name", type: "string" },
              { name: "price", title: "Price", type: "number" },
              { name: "quantity", title: "Quantity", type: "number" },
            ],
          },
        ],
      },
      {
        name: "totalAmount",
        title: "Total Amount",
        type: "number",
      },
      {
        name: "paymentMethod",
        title: "Payment Method",
        type: "string",
        options: {
          list: [{ title: "Cash on Delivery", value: "COD" }],
        },
      },
      {
        name: "status",
        title: "Order Status",
        type: "string",
        options: {
          list: [
            { title: "Pending", value: "pending" },
            { title: "Shipped", value: "shipped" },
            { title: "Delivered", value: "delivered" },
            { title: "Cancelled", value: "cancelled" },
          ],
        },
        initialValue: "pending",
      },
    ],
  };
  export default oders;