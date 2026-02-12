//QUESTION 1---// 

const fs = require ('fs');
const content = 'this is simple content of outr file . ';


function createFile() {
    fs.writeFileSync('output.txt', content,(err)=> {
        if(err) {
            console.error('file is created successfully',err);
            return ;
        }
        console.log('file is created successfully');
    });
}
createFile();
function readFile() {
    fs.readFileSync('output.txt','utf8',(err,data) => {
        if(err){
            console.error('error while reading file',err);
            return;
        }
        console.log('file content:',data);
    });
}

function countWords() {
    fs.readFile('output.txt','utf8',(err,data) => {
        if(err){
            console.error('error while reading file',err);
            return;
        }
        const words = data.split(/\s+/);
        console.log('word count:',words.length);
    });
}

module.exports = {
    createFile,
    readFile,
    countWords,

};