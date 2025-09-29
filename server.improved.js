const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

// const appdata = [
//   { "model": "toyota", "year": 1999, "mpg": 23 },
//   { "model": "honda", "year": 2004, "mpg": 30 },
//   { "model": "ford", "year": 1987, "mpg": 14} 
// ]

let groceryList = []


const server = http.createServer( function( request,response ) {
  if (request.method === "GET" && request.url === "/items") { 
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(groceryList));
  } else if( request.method === "GET" ) {
    handleGet( request, response )    
    //added smth here
  } else if( request.method === "POST" && request.url === "/submit"){
    handlePost( request, response ) 
  } else if( request.method === "POST" && request.url === "/delete"){
    handleDelete(request, response)
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

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    // console.log( JSON.parse( dataString ) )
    const incoming = JSON.parse(dataString)

    // ... do something with the data here!!!
    // will calculate how many days till expiration
    const now = new Date()
    const expDate = new Date(incoming.expirationDate)
    // number of milliseconds in a full day
    const msPerDay = 1000 * 60 * 60 * 24
    const daysUntilExpiration = Math.ceil((expDate - now) / msPerDay)

    // creates new object that includes all fields from 'incoming'
    const groceryItemWithExpiry = {
      ...incoming, daysUntilExpiration
    }

    // add new item to groceryList array
    groceryList.push(groceryItemWithExpiry)

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    // response.end("test")
    response.end(JSON.stringify(groceryList))
  })
}

const handleDelete = function(request, response) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    const incoming = JSON.parse(dataString)
    const index = incoming.index

    // need to check index and see if item is valid before deleting
    if (typeof index == "number" && index >= 0 && index < groceryList.length) {
      groceryList.splice(index, 1)
    }

    response.writeHead( 200, {"Content-Type": "application/json" })
    // response.end("test")
    response.end(JSON.stringify(groceryList))
  
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
