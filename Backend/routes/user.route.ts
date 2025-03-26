import express from "express";
import {
  register,
  login,
  verifyOTP,
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", authenticateToken, updateProfile);
router.post("/verify-otp", verifyOTP);
router.get("/getalluser", authenticateToken, getalluser); // Secured this route
router.get("/me", authenticateToken, getuserbyid);
router.post("/adduserdetail", authenticateToken, adduserdetail);
router.post("/deployportfolio", authenticateToken, deployPortfolio);
router.post("/getnearestjobs", authenticateToken, fetchJobs);
router.get("/checktrails/:pagename", authenticateToken, checktrails);
router.post("/getjobsbycourse", authenticateToken, fetchJobsByCourse); // Secured this route
router.post("/savecoursemarks", authenticateToken, savecoursemarks);
router.get("/getquizresults", authenticateToken, getquizresults);
router.get("/fetchleetcodequestions", authenticateToken, fetchleetcodequestions); // Secured this route
router.get("/leaderboard", leaderboard);

export default router;
