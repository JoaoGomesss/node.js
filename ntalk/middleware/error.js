module.exports = {
    notFound: (req, res, next) => {
      res.status(404).render('not-found');
    },
    serverError: (err, req, res, next) => {
      res.status(500).render('server-error', { error: err });
    }
  };