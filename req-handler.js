var states = require('./states');

exports.requestHandler = function requestHandler(req , res){
    var route;

    route = ({
        GET: {
            "/":states.root,
            "/download":states.download
        },
        POST:{
            "/upload":states.upload
        }
    })[req.method][req.url];

    (route||states.root)(req ,res);
}