var fs = require('fs')

function signIn(req, res){

    var temp, user = {},userList = [], lenList, exist = false, userIndex;
    
    req.on('data', data =>{
        temp = data.toString('utf-8');
        user = JSON.parse(temp);
                fs.readFile("./latest-state.txt" , function(err, datafile){
                    if (err) {
                        console.log("error sign up in reading file");
                        return err;        
                    }

                    userList = JSON.parse(datafile);
                    lenList = userList.length;
                    for(var i = 0; i<lenList; i++) {
                        if(userList[i].username == user.username){
                            exist = true;
                            userIndex = i;
                            i=lenList;
                        }
                    }
                
                    if(!exist){
                        res.write("notExist");
                        res.end();
                        return;
                    }
                    
                    if(userList[userIndex].password != user.password){
                        res.write("passWrong");
                        res.end();
                        return;
                    }

                    var randomNum = Math.floor(Math.random() * 800)+101;
                    const newToken = Buffer.from(user.password).toString('base64')+"%"+
                    randomNum + Buffer.from(user.username).toString('base64')+"";
                    var information = {
                        firstName : userList[userIndex].firstName,
                        lastName : userList[userIndex].lastName,
                        username : user.username,
                        token : newToken,
                        list : userList[userIndex].list
                    }
                    var JWT = JSON.stringify(information);

                    res.write(JWT);
                    res.end();
                });
    });

}
module.exports = signIn;
