const {Router} =require("express")
const {helloWorldController}=require("../controllers/user")
const userRouter=require("./user")
const accountRouter=require("./account")

const router= Router();
router.get("/hello",helloWorldController);
router.use("/user",userRouter);
router.use("/account",accountRouter);

module.exports=router;