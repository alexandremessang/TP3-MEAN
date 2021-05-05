const jwt = require('jsonwebtoken');

const authCheck = (req, res, next) => {
  try {
    console.log(req.headers);

    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId === userId) {
      next();
    } else {


    }
  } catch {
    res.status(401).json({
      //error: new Error('Invalid request!')
    });
  }

}

export default authCheck;
