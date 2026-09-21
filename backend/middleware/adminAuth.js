import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Admin access denied. No token provided.",
      });
    }

    // Expected format:
    // Bearer TOKEN
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({
        message: "Admin access denied. Invalid token format.",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Check admin role
    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin privileges required.",
      });
    }

    // Store admin information in request
    req.admin = decoded;

    next();
  } catch (error) {
    console.error("Admin authentication error:", error);

    return res.status(401).json({
      message: "Invalid or expired admin token.",
    });
  }
};

export default adminAuth;