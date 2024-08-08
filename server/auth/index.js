const jwt = require('jsonwebtoken');

const SECRET = 'my-secret-key';
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      // console.log("token extracted");
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          console.log("error on verification")
          return res.sendStatus(403);
        }
        // console.log("token verified")
        req.user = user;
        next();
      });
    } else {
      // console.log("no auth header")
      res.sendStatus(401);
    }
  };


module.exports = {
    SECRET,
    authenticateJwt
}