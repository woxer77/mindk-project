class UnprocessableEntityException extends Error {
  constructor(errors) {
    super(errors);
    this.name = 'UnprocessableEntityException';
    this.errors = errors;
  }
}

module.exports = UnprocessableEntityException;
