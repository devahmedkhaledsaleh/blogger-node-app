const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const schema = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    postImage: { type: "string" },
    username:{type: "string"},
    category:{type: "string"}
  },
  required: ["title", "description", "postImage","username","category"],
  additionalProperties: true,
};

module.exports = ajv.compile(schema);