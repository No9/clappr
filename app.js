var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , sites = require('./lib/sites')

app.listen(8080);
var maxX = 3;
var maxY = 3;
var currentX = 0;
var currentY = 0;

var sitList = sites.SiteList(maxX,maxY);
var siteSocket;

function handler (req, res) {
	
	if(req.url == '/test.html')
	{
fs.readFile(__dirname + '/test.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
	}else{


  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}
}

io.sockets.on('connection', function (socket) {
  
  	(function() {
	for (x = 0; x < maxX; x++) {
        for (y = 0; y < maxY; y++) {
            
            if(sitList[x][y].state == 0)
            {
            	sitList[x][y].state = 1;	
  				socket.emit('connect', new neighbourupdate(x, y));
  				return;	
            } 
        }
    }
	})();

  

  socket.on('restart', function(data)
  {
  	currentY = 0;
  	currentX = 0;
  });

  socket.on('clap', function (data) {
    //socket.emit('update', new neighbourupdate());
     pumpNeighbours(data.x, data.y, socket);
    console.log("clap");
    console.log( data);
  });

});

function pumpNeighbours(x, y, socket)
{
	var eventData = new Array();
	var power = 5;
	// Returns the number of neighbors for a specific coordinate.
    if (x + 1 < maxX)
    {
    	var n = new neighbourupdate(x, y)
    	n.power = power;
    	n.x = n.x +1;
    	eventData.push(n);
    }
    
    if (x - 1 >= 0)
    {
    	var n = new neighbourupdate(x, y)
    	n.power = power;
    	n.x = n.x - 1;
    	eventData.push(n);
    }

    if (y + 1 < maxY)
    {
    	var n = new neighbourupdate(x, y)
    	n.power = power;
    	n.y = n.y + 1;
    	eventData.push(n);
    }

    if (y - 1 >= 0)
    {
    	var n = new neighbourupdate(x, y)
    	n.power = power;
    	n.y = n.y - 1;
    	eventData.push(n);
    }

    // diaganols
    if (x + 1 < maxX && y + 1 < maxY)
    {
    	var n = new neighbourupdate(x, y)
    	n.power = power;
    	n.x = n.x + 1;
    	n.y = n.y + 1;
    	eventData.push(n);
    }
    
    if (x + 1 < maxX && y - 1 >= 0)
    {
    	var n = new neighbourupdate(x, y)
    	n.power = power;
    	n.x = n.x + 1;
    	n.y = n.y - 1;
    	eventData.push(n);
	}

    if (x - 1 >= 0 && y + 1 < maxY)
    {
    	var n = new neighbourupdate(x, y)
    	n.power = power;
    	n.x = n.x - 1;
    	n.y = n.y + 1;
    	eventData.push(n);
	}

    if (x - 1 >= 0 && y - 1 >= 0)
    {
        var n = new neighbourupdate(x, y)
    	n.power = power;
    	n.x = n.x - 1;
    	n.y = n.y - 1;
    	eventData.push(n);
	
    }
    console.log(eventData.length)
    socket.broadcast.emit('update', eventData);
}


function neighbourupdate(X, Y){
	if (X==undefined) X = 0;
	if (Y == undefined) Y = 0;
	this.x = X;
	this.y = Y;
	this.power = 0;
}

