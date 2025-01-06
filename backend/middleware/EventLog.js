const path = require('path');
const { format } = require('date-fns');
const { v4:uuid } = require('uuid');
const fs = require('fs')
const fsPromises = require('fs').promises


const EventLog = async (message,fileName) => {
    let dataTime = format(new Date(), 'yyyy MM dd\tHH:mm:ss')    
    let logEvent = `${dataTime}\t${uuid()}\t${message}\n`    
    if(!fs.existsSync(path.join(__dirname,'..','logs')))
        await fsPromises.mkdir(path.join(__dirname,'..','logs'))
    else{
        await fsPromises.appendFile(path.join(__dirname,'..','logs',`${fileName}`),logEvent)
    }
}
module.exports = EventLog;