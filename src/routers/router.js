module.exports = (app) =>{

   const memberRouter = require("./member/member_router");
   
   app.use("/member",memberRouter);

     const router = require("express").Router();
     router.get("/",(req,res)=>{
         if(req.session.username){
            res.cookie("isLogin",true);
         }  
         
         res.render("index",{username: req.session.username}); 
        // 기본라우터에 username추가해줘야 / 페이지에서도 session값을 쓸수있는거야
     });
     return router;
}