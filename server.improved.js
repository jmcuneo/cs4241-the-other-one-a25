const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const appdata = []

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }else{
    sendFile( response, filename )
  }
}

const sshws = function( mph ) {
  if (mph >= 157){
    return "Category 5 Major Hurricane";
  }
  else if (mph >= 130){
    return "Category 4 Major Hurricane";
  }
  else if (mph >= 111){
    return "Category 3 Major Hurricane";
  }
  else if (mph >= 96){
    return "Category 2 Hurricane";
  }
  else if (mph >= 74){
    return "Category 1 Hurricane";
  }
  else if (mph >= 39){
    return "Tropical Storm";
  }
  else{
    return "Tropical Depression";
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  
  let url = request.url.slice ( 1 );

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    if(url == "submit"){
      let add = JSON.parse( dataString );
      add.Airpressure = parseInt(add.Airpressure)
      add.Windspeed = parseInt(add.Windspeed)
      add.Year = parseInt(add.Year)
      console.log(add)
      add.Category = sshws(add.Windspeed)
      let AddedIndex = appdata.findIndex(function(element) {
        return element.Name === add.Name && element.Year === add.Year;
      });

      if(AddedIndex == -1){
        appdata.push(add);
      }
      else{
        appdata[AddedIndex] = add;
      }
    }
    else if(url == "delete"){
      let subtract = JSON.parse( dataString );
      subtract.Year = parseInt(subtract.Year)
      appdata.forEach((storm, index) => {
        if (subtract.Name == storm.Name && subtract.Year == storm.Year){
          appdata.splice(index, 1);
        }
        }
      )
    }
    response.writeHead( 200, "OK", {"Content-Type": "application/json" })
    response.end(JSON.stringify(appdata))
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

server.listen( process.env.PORT || port )
