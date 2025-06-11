module.exports = {
  hooks: {
    'pre-commit': 'lint-staged --relative --verbose --concurrent false',
  },
};
