// var socket = io();
var peer = new Peer({key: 'lwjd5qra8257b9'});
var peerid, socketid, fileid;
var con;

var downloadFileid = $("#fileid").text().trim();
var downloadFilename = $("#filename").text().trim();
var downloadFiletype = $("#filetype").text().trim();
var downloadPeerid = $("#peerid").text().trim();

//immediately connect to sender itself
peer.on('open', function(id) {
	console.log("peerid " + id);
  	peerid = id;
  	con = peer.connect(downloadPeerid);
});


peer.on('connection', function(conn) { 

	console.log("connection with sender done");
	
	$("#btnDownload").fadeIn(100);
	conn.on('open', function() {
	  // Receive messages
	  conn.on('data', function(data) {
	  	console.log(data); 
	  	if (data.file.constructor === ArrayBuffer) {
	        var dataView = new Uint8Array(data.file);	        
	        saveData(dataView, downloadFilename, downloadFiletype);	        
        }
	  });
	});

});

$("#btnDownload").click(function(){	
	con.send("ready");
})

$("#btnDownload").fadeOut(100);

var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName, filetype) {    	
        blob = new Blob([data], {type: "application/octet-stream"}),
        url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName + "";
        console.log(a.download);
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());