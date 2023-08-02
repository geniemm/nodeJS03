const router=require("express").Router();

const memberCtrl = require("../../controller/member/member_ctrl");
//router.get("/",(req,res)=>{res.send("member 연동")})

router.get("/login",memberCtrl.login);
router.post("/login_check",memberCtrl.loginCheck);
router.get("/logout",memberCtrl.logout);
router.get("/list",memberCtrl.list);
router.get("/register_view",memberCtrl.registerView);
router.post("/register",memberCtrl.register);
router.get("/member_info/:id",memberCtrl.memberInfo);
router.post("/modify",memberCtrl.modify);
router.get("/member_modify",memberCtrl.memberModify);
router.get("/delete/:id",memberCtrl.deleteMember);
module.exports = router;