var peer = new Peer({key: 'lwjd5qra8257b9'});
var peerid, fileid;
var con;
var file;

var box = $('#box');
box.on('dragenter', doNothing);
box.on('dragover', doNothing);

box.on('drop', function(e){
	e.originalEvent.preventDefault();
	file = e.originalEvent.dataTransfer.files[0];	

	var filename = file.name;
	var fileLastmodified = file.lastModified;
	var filetype = file.type;
	var filesize = file.size;

	fileid = filename.split(".")[0] + fileLastmodified;
	var link = window.location.href + "fileget/" + fileid;

	$("#link").attr("href", link);
	$("#link").text(link);
	$("#msg").text("Use this link to download the file.")

	//send info to server
	$.ajax({
		method: "POST",
		url: "/filedrop",
		data : {			
			peerid,			
			fileid,
			filename,
			filetype,
			filesize
			
		},
		success:function(data){
			console.log(data);
		}
	});
	console.log(file);
});

function doNothing(e){
	e.preventDefault();
    e.stopPropagation();
   
}

//peer
peer.on('open', function(id) {
	console.log("peerid " + id);
  	peerid = id;
  	$("#box").text("Drop a file here");
});

peer.on('connection', function(conn) { 
	console.log("connection with receiver done");
	con = peer.connect(conn.peer);	
	conn.on('open', function() {	 
	  conn.on('data', function(data) {
	  	if(data === "ready"){
	  		con.send({
				"type" : "file",
				"file": file
			});
	  	}
	  });	  
	});	
});

//init
$("#box").text("please wait ...");