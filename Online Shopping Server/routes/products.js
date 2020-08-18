var express = require('express');
var router = express.Router();
var sharedObj = require('./db')
var objectId = require('mongodb').ObjectID;
var multer = require('multer');
var fs=require('fs');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage });

router.post('/fileUpload', upload.single('photo'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        return res.send({
          success: true
        })
      }

});

router.post('/create-product',sharedObj.checkToken, function (req, res) {
    var dataObj = req.body.data;
    var db = sharedObj.getMongoCon(res, function (db) {
        var collection = db.collection('products');
        collection.insertOne(dataObj, function (err, suc) {
            if (err) {
                res.send(err);
            } else {
                res.send(suc.ops[0]);
            }
        });

    });

})

router.get('/get-my-products',sharedObj.checkToken,function(req,res){
     var vid=req.query.vid;
     var q={
         'vid':vid
     }

     sharedObj.getMongoCon(res,function(db){
            var collection=db.collection('products');

            collection.find(q).toArray(function(e,r){
                  if(e){
                      res.send(e);
                  }else{
                      res.send(r);
                  }
            })
     })

})


router.get('/get-all-products',sharedObj.checkToken,function(req,res){
    sharedObj.getMongoCon(res,function(db){
           var collection=db.collection('products');

           collection.find().toArray(function(e,r){
                 if(e){
                     res.send(e);
                 }else{
                     res.send(r);
                 }
           })
    })
})


router.get('/delete-product',sharedObj.checkToken,function(req,res){
    var id=req.query.id;

    var q={
        _id:objectId(id)
    }

    sharedObj.getMongoCon(res,function(db){
          var collection=db.collection('products');
          collection.deleteOne(q,function(e,r){
                if(e){
                    res.send(e);
                }else{
                    res.send(r);
                    fs.unlinkSync('public/images/'+id+'.jpg');
                }
          })
    })

})

router.get('/get-product-by-id',sharedObj.checkToken,function(req,res){
     var id=req.query.id;
     var q={
         _id:objectId(id)
     }

     sharedObj.getMongoCon(res,function(db){
         var collection=db.collection('products');
         collection.findOne(q,function(e,r){
             if(e){
                 res.send(e);
             }else{
                 res.send(r);
             }
         })
     })
})

router.post('/update-product',sharedObj.checkToken,function(req,res){
     var id=req.body._id;
     var name=req.body.name;
     var cost=req.body.cost;
     var desc=req.body.desc;

     var q={
         _id:objectId(id)
     }

     var newData={
         name:name,
         cost:cost,
         desc:desc
     }

     sharedObj.getMongoCon(res,function(db){
         var collection=db.collection('products');
         collection.updateOne(q,{$set:newData},function(e,r){
             if(e){
                 res.send(e);
             }else{
                 res.send(r);
             }
         })
     })

})



module.exports = router;