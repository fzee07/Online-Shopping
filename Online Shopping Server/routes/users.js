var express = require('express');
var router = express.Router();
var sharedObj = require('./db')
var objectId = require('mongodb').ObjectID;
var jwt=require('jsonwebtoken');
router.post('/user-reg', sharedObj.checkToken, function (req, res) {
  var dataObj = req.body.data;
  var db = sharedObj.getMongoCon(res, function (db) {
    var collection = db.collection('users');
    collection.insertOne(dataObj, function (err, suc) {
      if (err) {
        res.send(err);
      } else {
        res.send(suc);
      }
    });

  });

})
router.post('/login-check', function (req, res) {
  var dataObj = req.body.data;
  sharedObj.getMongoCon(res, function (db) {
    var collection = db.collection('users');
    collection.find(dataObj).toArray(function (err, suc) {
      if (err) {
        res.send(err);
      } else {
        if(suc && suc.length){
          res.json({
            data:suc,
            token:jwt.sign(dataObj,'my-token')
          })

        }else{
          res.send(suc);
        }
        
      }
    })
  })
})


router.get('/get-vendors',sharedObj.checkToken, function (req, res) {
  sharedObj.getMongoCon(res, function (db) {
    var collection = db.collection('users');
    collection.find({ role: 'vendor' }).toArray(function (e, r) {
      if (e) {
        res.send(e);
      } else {
        res.send(r);
      }
    })
  })
})

router.get('/delete-vendor',sharedObj.checkToken, function (req, res) {
     var id=req.query.id;
       
     var q={
       _id:objectId(id)
     }

     sharedObj.getMongoCon(res,function(db){
         var collection=db.collection('users');
         collection.deleteOne(q,function(e,r){
             if(e){
               res.send(e);
             }else{
               res.send(r);
             }
         })
     })
})


router.post('/update-vendor',sharedObj.checkToken,function(req,res){
    var id=req.body._id;
    var pwd=req.body.pwd;
    var email=req.body.email;
    var phone=req.body.phone;

    var q={
       _id:objectId(id)
    }

    var newData={
      'pwd':pwd,
      'email':email,
      'phone':phone
    }

    sharedObj.getMongoCon(res,function(db){
      var collection=db.collection('users');
      collection.updateOne(q,{$set:newData},function(e,r){
        if(e){
          res.send(e);
        }else{
          res.send(r);
        }
      })
  })
})


router.get('/get-user-det',sharedObj.checkToken,function(req,res){
      var id=req.query.id;

      var q={
        _id:objectId(id)
      }

      sharedObj.getMongoCon(res,function(db){
        var collection=db.collection('users');
        collection.findOne(q,function(e,r){
            if(e){
              res.send(e);
            }else{
              res.send(r);
            }
        })
    })
})

router.post('/place-order',sharedObj.checkToken,function(req,res){
    var id=req.body.id;
    var product=req.body.product;
    
    var q={
      _id:objectId(id)
    }

    sharedObj.getMongoCon(res,function(db){
      var collection=db.collection('users');
      collection.updateOne(q,{$push:{'orders':product}},function(e,r){
        if(e){
          res.send(e);
        }else{
          res.send(r);
        }
      })
  })



})

router.post('/remove-from-cart',sharedObj.checkToken,function(req,res){
   var id=req.body.id;
   var pid=req.body.pid;

   var q={
     _id:objectId(id)
   }
   
  
   
  sharedObj.getMongoCon(res,function(db){
    var collection=db.collection('users');
    collection.updateOne(q,{$pull:{'cart':{_id:pid}}},function(e,r){
      if(e){
        res.send(e);
      }else{
        res.send(r);
      }
    })
})

})
router.post('/add-to-cart',sharedObj.checkToken,function(req,res){
  var id=req.body.id;
  var product=req.body.product;
  
  var q={
    _id:objectId(id)
  }

  sharedObj.getMongoCon(res,function(db){
    var collection=db.collection('users');
    collection.updateOne(q,{$push:{'cart':product}},function(e,r){
      if(e){
        res.send(e);
      }else{
        res.send(r);
      }
    })
})



})

router.post('/custmer-reg',function (req, res) {
  var dataObj = req.body.data;
  var db = sharedObj.getMongoCon(res, function (db) {
    var collection = db.collection('users');
    collection.insertOne(dataObj, function (err, suc) {
      if (err) {
        res.send(err);
      } else {
        res.send(suc);
      }
    });

  });

})

router.post('/update-customer',sharedObj.checkToken,function(req,res){
      var id=req.body._id;
      var pwd=req.body.pwd;
      var email=req.body.email;
      var phone=req.body.phone;
      var add=req.body.add;
      var q={
        _id:objectId(id)
     }
 
     var newData={
       'pwd':pwd,
       'email':email,
       'phone':phone,
       'add':add
     }
 
     sharedObj.getMongoCon(res,function(db){
       var collection=db.collection('users');
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
