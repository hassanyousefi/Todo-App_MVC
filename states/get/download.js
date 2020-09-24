var fs = require("fs");

function download (req, res){
    
    fs.readFile("./latest-state.txt" , function(err, data){
        if (err) {
            console.log("error download!");
            return err;        
        }    
        res.write(data);
        res.end();
    });
}
module.exports = download;