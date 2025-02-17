const express = require("express");
const token = require("../JWT/token");
const UserToken = require("../JWT/UserToken");
const multer = require("multer");
const AdminController = require("../Controllers/AdminController");
const AutoCadController = require("../Controllers/AutoCadController");
const UserController = require("../Controllers/UserController");
const router = express.Router();

const userProfile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Storage/UserProfile");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: userProfile });
router.patch(
  "/update-picture/:id",
  upload.single("image"),
  AdminController.UpdatePicture
);

const autocadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Store CAD files in the "uploads" folder within "Storage"
    cb(null, "./Storage/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const autocadfile = multer({
  storage: autocadStorage,
});

router.post("/signup", AdminController.Signup);
router.post("/adminlogin", AdminController.Login);
router.get("/adminstatus", AdminController.AdminStatus);
router.post("/search_user", token, AdminController.SearchUser);
router.get("/get_users", token, AdminController.GetUsers);
router.get("/get_singleuser/:id", AdminController.GetSingleUser);
router.delete("/delete_users/:id", token, AdminController.DeleteUser);
router.put("/update_users/:id", token, AdminController.UpdateUser);
router.get("/admin_logout", token, AdminController.Logout);
router.get("/stats", AdminController.Stats);

router.post("/login", UserController.Login);
router.get("/checklogin", UserController.CheckLogin);
router.get("/user_logout", UserController.UserLogout);

router.post("/check-email", UserController.CheckEmail);
router.post("/signup", UserController.Signup);

router.get("/auth", AutoCadController.Auth);
router.post("/check-create-bucket", AutoCadController.checkAndCreateBucket);
router.post(
  "/upload_file",
  autocadfile.single("file"),
  AutoCadController.UploadAutoCad
);

router.post("/translatefile", AutoCadController.Translate);
router.get("/checker", AutoCadController.checker);


module.exports = router;
