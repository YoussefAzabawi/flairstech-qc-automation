export const loginSuccessSchema = {
  type: 'object',
  properties: {
    responseCode: { type: 'number' },
    message: { type: 'string' },
  },
  required: ['responseCode', 'message'],
  additionalProperties: true,
};

export const loginErrorSchema = loginSuccessSchema;

