import fs from 'fs';

function borrowrecord(memberid, bookid, borrowdate, returndate) {
    try{
        if(!fs.existsSync('members.json'))return "No members found";
        let members=json.parse(fs.readFileSync('members.json',"utf8"))
        let ismember =members.find((value)=>value.memberid===memberid)
        if(!member)return "Member not found";

        member.borrowbook.push({
            bookid,
            borrowdate,
            returndate
        })

        fs.writeFileSync('members.json',JSON.stringify(members))
        return "Book borrowed successfully"
    }
    catch(error){
        return error.message
    }
}
export default borrowrecord;