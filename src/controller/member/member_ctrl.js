const ser = require("../../service/member/member_service");

const login =(req,res)=>{
    res.render("member/login",{username: req.session.username});

}
const loginCheck = async (req,res)=>{
    console.log("=== ctrl loginCheck === ")
    console.log(req.body);
    const msgPack = await ser.loginCheck(req.body); 

   // console.log("mspPack: ",msgPack); // 로그인 성공/실패 시 어떤값이 있는지 보자
    console.log("msgPack.result: ",msgPack.result);
    if(msgPack.result===0){
        req.session.username = req.body.id;
    }
    res.send(msgPack.msg);
}
const logout = (req,res)=>{
    req.session.destroy();
    res.clearCookie("isLogin");
    res.redirect("/");
}
const list = async (req,res)=>{
    const mList = await ser.memberList(); 
    // 서비스에 요청해서 모든 리스트를 mList에 받아옴
    res.render("member/list",{username: req.session.username, list:mList});

}
const registerView = (req,res)=>{
    res.render("member/register_view",{username: req.session.username});
}   

const register = async (req,res)=>{
    console.log("register: ", req.body);
    let msg = await ser.insert(req.body);
    res.send(msg);
}
const memberInfo = async (req,res)=>{
    console.log("memberInfo ctrl: ",req.params);
    const member=await ser.memberInfo(req.params);
    console.log("controller memberInfo: ",member);
    res.render("member/member_info",{member,username: req.session.username});
}
const modify = async (req,res)=>{
        console.log("ctrl modify: ",req.body);
        const msg = await ser.modify(req.body);
        res.send(msg);
}
const memberModify = async(req,res)=>{
    console.log("ctrl modify: ",req.query);
    console.log("ctrl modify: ", req.params);
    const member = await ser.memberInfo(req.query);
    console.log("ctrl modify: ", member);

    res.render("member/member_modify",{member,username: req.session.username});
}
const deleteMember = async(req,res)=>{
    const msg = await ser.deleteMember(req.params);
    res.send(msg);
}
module.exports ={deleteMember, memberModify, modify, memberInfo, register, registerView, list, logout, login, loginCheck};