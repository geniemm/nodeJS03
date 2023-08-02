const memberDAO = require("../../database/member/member_dao");

const loginCheck = async (body)=>{
    let member = await memberDAO.getMember(body.id);
    // id 만 보내서 해당하는 아이디가 있다면 정보를 가져올 수 있도록 일단 id만 보내봐
    console.log(" === ser loginCheck ===");
    console.log(member);
    let msg="",url="", msgPack={};
    if(member.rows.length===1){
        member = member.rows[0];
        if(member.PWD == body.pwd){
            msg = member.NAME+"님 환영합니다!";
            url = "/";
            //msgPack = {result:0} 로그인 성공시에만 result값이 있는것
            msgPack.result =0;
        }else{
            msg = "비밀번호가 틀렸습니다.";
            url = "/member/login";
        }
    }else{ // 존재하지 않는 경우
        msg="해당하는 id는 존재하지 않습니다!";
        url="/member/login";
    }
    // msgPack ={msg:"<sc.. </script>"}
    msgPack.msg=getMessage(msg,url);
    return msgPack;
}
const getMessage =(msg,url)=>{
    return `<script>
            alert("${msg}"); 
            location.href="${url}";        
         </script>`;
}
const memberList = ( )=>{
    return memberDAO.memberList();
}
const insert = async (body) =>{
    const result = await memberDAO.insert(body);
    console.log("service insert =>",result);
    let msg="", url="";
    if(result ==0) {
        msg="문제발생";
        url ="/member/register_view";
    }else{
        msg="등록 성공";
        url="/member/list";
    }
    const msgPack = getMessage(msg,url);
    return msgPack;
}
const memberInfo = (id) =>{
    console.log("service=>", memberDAO.memberInfo(id));
    return memberDAO.memberInfo(id);

}
const modify = async (body)=>{
    const result = await memberDAO.modify(body);
    let msg="", url="";
    if(result ==0) {
        msg="문제발생";
        url ="/member/member_modify?id="+body.id;
    }else{
        msg="수정 성공";
        url="/member/member_info/"+body.id;
    }
    return getMessage(msg,url);
}
const deleteMember = async(body)=>{
    const result =await memberDAO.deleteMember(body);
    let msg="", url="";
    if(result ==0) {
        msg="문제발생";
        url ="/member/member_info/"+body.id;
    }else{
        msg="삭제 성공";
        url="/member/list";
    }
    return getMessage(msg,url);
}
module.exports ={deleteMember, modify,memberInfo, insert, memberList, loginCheck};