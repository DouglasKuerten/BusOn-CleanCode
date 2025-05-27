class BusonException extends Error {
  constructor(statusCode = 500, message, originalError) {
    super(message);
    this.name = 'BusonException';
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}

export default BusonException;
