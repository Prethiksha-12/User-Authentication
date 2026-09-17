const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authenticate, authController.logout);

router.get("/me", authenticate, authController.me);
router.put("/change-password", authenticate, authController.changePassword);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  authController.adminOnly
);

router.get(
  "/manager",
  authenticate,
  authorize("ADMIN", "PROJECT_MANAGER"),
  authController.managerOnly
);

router.get(
  "/employee",
  authenticate,
  authorize("ADMIN", "PROJECT_MANAGER", "EMPLOYEE"),
  authController.employeeOnly
);

module.exports = router;