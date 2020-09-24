var fs = require('fs');

 function root (req, res){
    if(req.url=="/"){
        req.url="index.html";
    }
    fs.readFile("./client/"+req.url , function(err, data){
        if(err) {
            return err;
        }
        res.writeHead(200);
        res.write(data);
        res.end();
    });
}
module.exports = root;