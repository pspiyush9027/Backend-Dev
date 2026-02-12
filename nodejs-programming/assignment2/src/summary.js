import fs from 'fs';

function summary(memberid,totalvalue) {
    try 
    {
        if(!fs.existsSync('members.json')) return "No members found";
        let members= JSON.parse(fs.readFileSync('members.json',"utf8"))
        let member= members.find((value)=>value.memberid===memberid)
        if(!member) return "Member not found";
        let summary={
            memberid:member.memberid,
            name:member.name,
            totalvalue:totalvalue
        }
        return summary;
    }
    catch(error){
        return error.message;
    }
}
export default summary;