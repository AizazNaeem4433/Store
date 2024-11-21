const heroImageSchema = {
  name: "heroImage",
  type: "document",
  title: "Two Hero Images",
  fields: [
    {
      name: "Image1",
      type: "image",
      title: "First Image",
    },
    {
      name: "Image2",
      type: "image",
      title: "Second Image",
    },
  ],
};

export default heroImageSchema;
