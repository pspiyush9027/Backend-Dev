import fs from 'fs';

function createBook(bookid,tittle,author,price) {
    try{
        let book = []
        let ob = {
             bookid,
             tittle,
             author,
             price
        }
        if(fs.exists.Sync('books.json')){
            let data = JSON.parse(fs.readFileSync('books.json',"utf8"))
            let isbook=data.some((value)=>value.bookid==bookid)
            if(isbook){
                return "Book with this ID already exists"
            }
            book.push(ob)
            
            }
            fs.writeFileSync('books.json',JSON.stringify(data))
            return "Book added successfully"
    }
    catch(error){
        return error.message
    }


}
export default createBook;
    