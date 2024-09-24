const {Router}=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getBalance, moneyTransfer } = require('../controllers/account');

const router=Router();

router.get("/balance", authMiddleware, getBalance);

router.post("/transfer", authMiddleware, moneyTransfer);

router.get('/hello',authMiddleware,(req,res)=>{{
    return res.json({success:"Hello"})
}})



module.exports=router;