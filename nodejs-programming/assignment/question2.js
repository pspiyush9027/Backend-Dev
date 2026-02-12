const { create } = require('domain');
const fs = require('fs');
const content = 'need this in capital letters';

function createFile() {
    fs.writeFileSync('answer2.txt', content, (err) => {
        if (err) {
            console.error('file is created successfully',err);
            return ;
        }
        console.log('file is created successfully');
    });
}
createFile();

function readFile() {
    fs.readFileSync('answer2.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('error while reading file', err);
            return;
        }
        console.log('file content:', data);
    }
    );
}


function capitalstring(){
    fs.readFile('answer2.txt','utf8',(err,data) => {
        if(err){
            console.error('error while reading file',err);
            return;
        }
        const capitalized = data.toUpperCase();
        console.log('capitalized string:',capitalized);
    });
}

function reverseString(){
    fs.readFile('answer2.txt','utf8',(err,data) => {
        if(err){
            console.error('error while reading file',err);
            return;
        }
        const reversed = data.split('').reverse().join('');
        console.log('reversed string:',reversed);
    }
    );
}

function countvowels(){
    fs.readFile('answer2.txt','utf8',(err,data) => {
        if(err){
            console.error('error while reading file',err);
            return;
        }
        const vowels = data.match(/[aeiouAEIOU]/g);
        const count = vowels ? vowels.length : 0;
        console.log('vowel count:',count);
    });
}


module.exports = {

    capitalstring,
    reverseString,
    countvowels
};