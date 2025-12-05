export const labRequestSchema = {
  type: "object",
  required: ["requestId", "patient", "tests", "createdAt"],
  additionalProperties: false,
  properties: {
    requestId: { type: "string", minLength: 3 },
    createdAt: { type: "string", format: "date-time" },
    patient: {
      type: "object",
      required: ["id", "name", "dob"],
      additionalProperties: false,
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        dob: { type: "string", format: "date" },
        gender: { type: "string", enum: ["M", "F", "Other"], nullable: true },
        phone: { type: "string", nullable: true }
      }
    },
    tests: {
      type: "array",
      minItems: 1,
      items: { type: "string", enum: ["cbc","biochem","psa","pcr","cytology","urine","glucose"] }
    },
    meta: {
      type: "object",
      additionalProperties: true
    }
  }
};
