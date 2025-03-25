import express from "express";
import {
  register,
  login,
  updateProfile,
  verifyOTP,
  getalluser,
  getuserbyid,
  adduserdetail,
  deployPortfolio,
  fetchJobs,
  checktrails,
  fetchJobsByCourse,
  savecoursemarks,
  getquizresults,
  fetchleetcodequestions,
  leaderboard,
} from "../controllers/user.controller";
import { authenticateToken } from "../Middlewares/auth.middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", authenticateToken, updateProfile);
router.post("/verify-otp", verifyOTP);
router.get("/getalluser", getalluser);
router.get("/me", authenticateToken, getuserbyid);
router.post("/adduserdetail", authenticateToken, adduserdetail);
router.post("/deployportfolio", authenticateToken, deployPortfolio);
router.post("/getnearestjobs", authenticateToken, fetchJobs);
router.get("/checktrails/:pagename", authenticateToken, checktrails);
router.post("/getjobsbycourse", fetchJobsByCourse);
router.post("/savecoursemarks", authenticateToken, savecoursemarks);
router.get("/getquizresults", authenticateToken, getquizresults);
router.get("/fetchleetcodequestions", fetchleetcodequestions);
router.get("/leaderboard", leaderboard);

export default router;
