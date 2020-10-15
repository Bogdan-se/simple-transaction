export const HttpError = class extends Error {
  constructor(code, message, type) {
    super(message);
    this.code = code;
    this.type = type;
  }
};