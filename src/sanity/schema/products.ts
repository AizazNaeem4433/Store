const product= {
  name: "product",
  type: "document",
  title: "Product",

  fields: [
    {
      name: "name",
      type: "string",
      title: "Name of Product",
    },
    {
      name: "image",
      type: "array",
      title: "Product Images",
      of: [{ type: "image" }],
    },
    {
      name: "description",
      type: "text",
      title: "Description of Product",
    },
    {
      name: "slug",
      type: "slug",
      title: "Product Slug",
      options: {
        source: "name",
        maxLength: 200,
      },
    },
    {
      name: "basePrice",
      title: "Base Price (Per 1kg)",
      type: "number",  // Ensure it's a number field to store the base price
    },
    {
      name: "weight",
      title: "Weight Options",
      type: "array",  // Array to allow multiple weight options
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Weight Label",
              type: "string",
              options: {
                list: [
                  { title: "50g", value: "50g" },
                  { title: "100g", value: "100g" },
                  { title: "200g", value: "200g" },
                  { title: "400g", value: "400g" },
                  { title: "1kg", value: "1kg" },
                ],
              },
            },
            {
              name: "multiplier",
              title: "Price Multiplier",
              type: "number",
              description: "This multiplier will be used to calculate the price for this weight.",
            },
          ],
        },
      ],
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],  // Reference the category document
    },
  ],
};

export default product;