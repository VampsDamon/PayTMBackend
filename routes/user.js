const {Router}=require("express");
const { signUp, signIn, updateUserInfo, filterUser } = require("../controllers/user");
const authMiddleware = require("../middlewares/authMiddleware");

const router=Router();

router.post("/signup",signUp)
router.post("/signIn",signIn)

router.put("/",authMiddleware,updateUserInfo);

router.get("/bulk", filterUser);





module.exports=router;