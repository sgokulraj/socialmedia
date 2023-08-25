import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
      const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = verified;
      next();
    } else {
      res.status(403).send("Access Denied");
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

