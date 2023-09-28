export const requireToken = (req, res, next) => {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res.status(401).json({ error: "Access denied - Please SignUp/Login" });
    }
    next();
  };