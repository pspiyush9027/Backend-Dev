import { captureRejectionSymbol } from 'events';
import fs from 'fs';

function totalvalue(memberid,bookprice) {
    try{
        if(!fs.existsSync('members.json')) return "No members found";
        let members= JSON.parse(fs.readFileSync('members.json',"utf8"))
        let member= members.find((value)=>value.memberid===memberid)
        if(!member) return "Member not found";
        let totalvalue=0;
        member.borrowbook.forEach((borrow)=>
            {
                totalvalue+=borrow.price; 
                if(membertype==="Premium"){
                    totalvalue=totalvalue*0.9;
                }
                else if(membertype==="Gold"){
                    totalvalue=totalvalue*0.8;
                }
            else{
                totalvalue=totalvalue;
            }
            }
        );
        return totalvalue;
    }
    catch(error){
        return error.message;
    }
}
export default totalvalue;