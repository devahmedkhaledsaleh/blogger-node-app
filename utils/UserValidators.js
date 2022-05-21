const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const schema = {
  type: "object",
  properties: {
    username: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    profileImage:{type: "string"}
  },
  required: ["email", "password"],
  additionalProperties: false,
};

module.exports = ajv.compile(schema);
