// COD order schema
const orderSchema = {
  name: "order",
  type: "document",
  title: "Order",
  fields: [
    {
      name: "customerName",
      type: "string",
      title: "Customer Name",
    },
    {
      name: "customerEmail",
      type: "string",
      title: "Customer Email",
    },
    {
      name: "items",
      type: "array",
      title: "Items",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Product Name" },
            { name: "description", type: "string", title: "Description" },
            { name: "price", type: "number", title: "Price" },
            { name: "currency", type: "string", title: "Currency" },
            { name: "image", type: "url", title: "Image URL" },
          ],
        },
      ],
    },
    {
      name: "totalAmount",
      type: "number",
      title: "Total Amount",
    },
    {
      name: "paymentMethod",
      type: "string",
      title: "Payment Method",
    },
    {
      name: "status",
      type: "string",
      title: "Status",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Completed", value: "completed" },
        ],
      },
    },
  ],
};

export default orderSchema;
