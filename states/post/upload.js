var fs = require("fs");

function upload(req, res){
    
    var dataText='';
    req.on('data', data => {
        dataText += data.toString('utf-8');
        
        fs.writeFile('latest-state.txt',dataText, function(err){
            if(err){
                console.log('error upload!');
                return err;
            }
            
        })
    });
    
}

module.exports = upload;