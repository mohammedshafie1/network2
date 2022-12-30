var alert=require('alert');
var express = require('express');
const { Db } = require('mongodb');
var path = require('path');
const { setFlagsFromString } = require('v8');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');



const d = ["bali","paris","annapurna","rome","inca","santorini"];

app.use(cookieParser());
app.use(
  session({
    resave:true,
    saveUninitialized:true,
    secret:"secret"
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
  res.render('login');
});

app.get('/home',function(req,res){
  res.render('home');
});

app.get('/registration',function(req,res){
  res.render('registration');
});

app.get('/annapurna', function(req,res){
  res.render('annapurna');
});

app.get('/bali', function(req,res){
  res.render('bali');
});

app.get('/cities', function(req,res){
  res.render('cities');
});

app.get('/hiking', function(req,res){
  res.render('hiking');
});

app.get('/inca', function(req,res){
  res.render('inca');
});

app.get('/islands', function(req,res){
  res.render('islands');
});

app.get('/paris', function(req,res){
  res.render('paris');
});

app.get('/rome', function(req,res){
  res.render('rome');
});

app.get('/santorini', function(req,res){
  res.render('santorini');
});

app.get('/searchresults', function(req,res){
  res.render('searchresults');
});

app.get('/wanttogo', function(req,res){ 
  console.log(req.session);
  res.render('wanttogo',{data:req.session.user.wanttogolist})
});




app.post('/register',function(req,res){
var x=req.body.username
var y=req.body.password
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
  if(err) throw err;
  var db =client.db('myDB');
db.collection('myCollection').find().toArray(function(err,array){
  if(x==''){
    alert('you did not enter username');
  }else if (y==''){
    alert('you did not enter a password')
  }else if(array.length==null){
        db.collection('myCollection').insertOne({username: x , password:y ,wanttogolist:[]})
        res.render('login');
       return;
  }else{
        var flag=false;
        for(let i=0;i<array.length;i++){
        if(array[i].username==x){
        flag=true;
        alert('ALREADY EXISTS');
        return;
       }
    };
        if(flag==false){
        db.collection('myCollection').insertOne({username: x , password:y,wanttogolist:[]})
        res.render('login');
        return;
    };
  }; 
  });
    });
}); 


app.post('/login',function(req,res){
var x=req.body.username
var y=req.body.password
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
  if(err) throw err;
  var db =client.db('myDB');
  db.collection('myCollection').find().toArray(function(err,array){
    if(x==''){
      alert('you did not enter username');
    }else if (y==''){
      alert('you did not enter a password')
    }else if(x=='admin'&&y=='admin'){
      res.redirect('home');
    }else{
      var flag=false;
      for(let i=0;i<array.length;i++){
        if(x==array[i].username && y==array[i].password){
          req.session.user=array[i];
          flag=true;
        };
      };
      if(flag==true){
        res.render('home');
      }else{
        alert('username or password doesnot exist');
      };
    };
  });
});
}
);

app.post('/inca',function(req,res){
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
     if(err) throw err;
     var db =client.db('myDB');
     if(req.session.user.wanttogolist.includes('inca')){
      alert('inca already exists in the list');
    }else{
      req.session.user.wanttogolist.push('inca');
      db.collection('myCollection').updateOne({username:req.session.user.username},{$set:{wanttogolist:req.session.user.wanttogolist}});
      db.collection('myCollection').findOne({username:req.session.user.username},(err,data)=>{
        req.session.user = data;
        req.session.save();
      });
      res.redirect('/inca');
    }
     });
  });


 app.post('/annapurna',function(req,res){
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
       if(err) throw err;
       var db =client.db('myDB');
       if(req.session.user.wanttogolist.includes('annapurna')){
        alert('annapurna already exists in the list');
      }else{
        req.session.user.wanttogolist.push('annapurna');
        db.collection('myCollection').updateOne({username:req.session.user.username},{$set:{wanttogolist:req.session.user.wanttogolist}});
        db.collection('myCollection').findOne({username:req.session.user.username},(err,data)=>{
          req.session.user = data;
          req.session.save();
        });
      }
      res.redirect('/annapurna');
       });
    });


   app.post('/paris',function(req,res){
      var MongoClient = require('mongodb').MongoClient;
      MongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
         if(err) throw err;
         var db =client.db('myDB');
         if(req.session.user.wanttogolist.includes('paris')){
          alert('paris already exists in the list');
        }else{
          req.session.user.wanttogolist.push('paris');
          db.collection('myCollection').updateOne({username:req.session.user.username},{$set:{wanttogolist:req.session.user.wanttogolist}});
          db.collection('myCollection').findOne({username:req.session.user.username},(err,data)=>{
            req.session.user = data;
            req.session.save();
          });
          res.redirect('/paris');
        }
         });
      });



      app.post('/rome',function(req,res){
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
           if(err) throw err;
           var db =client.db('myDB');
           if(req.session.user.wanttogolist.includes('rome')){
            alert('rome already exists in the list');
          }else{
            req.session.user.wanttogolist.push('rome');
            db.collection('myCollection').updateOne({username:req.session.user.username},{$set:{wanttogolist:req.session.user.wanttogolist}});
            db.collection('myCollection').findOne({username:req.session.user.username},(err,data)=>{
              req.session.user = data;
              req.session.save();
            });
            res.redirect('/rome');
          }
           });
        });

        app.post('/bali',function(req,res){
          var MongoClient = require('mongodb').MongoClient;
          MongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
             if(err) throw err;
             var db =client.db('myDB');
             if(req.session.user.wanttogolist.includes('bali')){
              alert('bali already exists in the list');
            }else{
              req.session.user.wanttogolist.push('bali');
              db.collection('myCollection').updateOne({username:req.session.user.username},{$set:{wanttogolist:req.session.user.wanttogolist}});
              db.collection('myCollection').findOne({username:req.session.user.username},(err,data)=>{
                req.session.user = data;
                req.session.save();
              });
              res.redirect('/bali');
            }
             });
          });
  


          app.post('/santorini',function(req,res){
            var MongoClient = require('mongodb').MongoClient;
            MongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
               if(err) throw err;
               var db =client.db('myDB');
               if(req.session.user.wanttogolist.includes('santorini')){
                alert('santorini already exists in the list');
              }else{
                req.session.user.wanttogolist.push('santorini');
                db.collection('myCollection').updateOne({username:req.session.user.username},{$set:{wanttogolist:req.session.user.wanttogolist}});
                db.collection('myCollection').findOne({username:req.session.user.username},(err,data)=>{
                  req.session.user = data;
                  req.session.save();
                });
                res.redirect('/santorini');
              }
               });
            });

          app.post('/search',function(req,res){
            var MongoClient = require('mongodb').MongoClient;
            MongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
               if(err) throw err;
               var db =client.db('myDB');
            var s=req.body.Search;
            var t=[];
            for(let i=0;i<d.length;i++){
               if(d[i].includes(s.toLowerCase()))
                  t.push(d[i]);  
               }
               if(t.length==0)
                alert('not found');
               
               res.render('searchresults',{dst:t})
            
});
          })


          
          
          



app.listen(3000);
