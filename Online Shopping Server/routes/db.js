var mongodb = require('mongodb');
var jwt = require('jsonwebtoken')
var sharedObj = {};

sharedObj.getMongoCon = function (res, cb) {
   var mongoClient = mongodb.MongoClient;
   var url="mongodb+srv://srinu:srinu@cluster0-1jhkn.mongodb.net/test?retryWrites=true&w=majority"
   mongoClient.connect(url, { useNewUrlParser: true }, function (err, cluster) {
      if (err) {
         res.send('db connection error');
      }
      var db = cluster.db('onlineshopping');
      cb(db);
   })
}

sharedObj.getMysqlCon = function () {

}

sharedObj.checkToken = function (req, res, next) {
   var tokenInfo = req.headers.authorization;

   if (tokenInfo) {
      jwt.verify(tokenInfo, 'my-token', function (e, r) {
         if (e) {
            res.status(401).send({
               'msg':"Invalid token"
            });
         } else {
            next();
         }
      })

   } else {
      res.status(401).send({
         'msg':"Invalid token"
      });
     
   }
}


module.exports = sharedObj;