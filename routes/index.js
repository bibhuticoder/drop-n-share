var express = require('express');
var router = express.Router();



var files = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Drop-n-share' });
});


router.post('/filedrop', function(req, res, next) { 
	console.log(req.body);
   var peerid = req.body.peerid;
   var fileid = req.body.fileid;
   var filename = req.body.filename; 
   var filetype = req.body.filetype;
   var filesize = req.body.filesize;
  
  files[fileid] = {
  	"peerid" : peerid,
  	"fileName" : filename,
  	"fileType" : filetype,
  	"fileSize" : filesize
  };

  console.log("sadsadasd");
  res.send("success file drop");
});

router.get('/fileget/:fileid', function(req, res, next) {
  var fileid = req.params.fileid;
  var peerid = files[fileid]["peerid"];

  var fileName = files[fileid]["fileName"]; 
  var fileType = files[fileid]["fileType"];
  var fileSize = files[fileid]["fileSize"];
  
  console.log(files[fileid][0] + "---------------");
  res.render('fileget', { fileid, peerid, fileName, fileType, fileSize});
});

router.get('/download', function(req, res, next) {
  var fileid = req.params.fileid;
  var peerid = files[fileid][0];
  var socketid = files[fileid][1];

  res.send({
  	fileid,
  	peerid,
  	socketid
  });  
});




module.exports = router;
