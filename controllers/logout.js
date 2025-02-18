async function get(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
      res.json({
      text: 'successful logout',
      user: undefined,
      token: undefined,
    });
  });
}

module.exports = {
  get,
};
