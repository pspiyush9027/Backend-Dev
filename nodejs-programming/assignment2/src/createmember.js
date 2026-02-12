import fs from 'fs';

function createMember(memberid, name, membershiptype) {
    try{
        let member = [];
        ob={
            memberid,
            name,
            membershiptype
        }
        if(fs.existsSync('members.json')){
            let data= JSON.parse(fs.readFileSync('members.json',"utf8"))
            let ismember= data.some((value)=>value.memberid==memberid)
            if(ismemeber){
                return "Member already exists"
            }
            member.push(ob)
    }
    fs.writeFileSync('members.json',JSON.stringify(data))
    return "Member added"
}
catch ( error){
    return error.message
}
}
export default createMember;