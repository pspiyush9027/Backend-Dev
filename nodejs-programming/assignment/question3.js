const fs = require('fs');
const os = require('os');

function oslogs(){
    console.log('Operating System Logs:');
    console.log('OS Type:', os.type());
    console.log('CPU Info:', os.cpus());
    console.log('Total Memory:', os.totalmem());

}

module.exports = {
    oslogs,
};