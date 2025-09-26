// import express from "express"
// import ViteExpress from "vite-express"

// const app = express()
// const appdata = ["hiudasicni"]

// app.use(express.json())
// app.get("/", (request, response) => response.json(appdata))
// app.post("/data", (request, response) => {
//   appdata.push(req.body)
//   response.json(appdata)
// })

// // const sshws = function( mph ) {
// //   if (mph >= 157){
// //     return "Category 5 Major Hurricane";
// //   }
// //   else if (mph >= 130){
// //     return "Category 4 Major Hurricane";
// //   }
// //   else if (mph >= 111){
// //     return "Category 3 Major Hurricane";
// //   }
// //   else if (mph >= 96){
// //     return "Category 2 Hurricane";
// //   }
// //   else if (mph >= 74){
// //     return "Category 1 Hurricane";
// //   }
// //   else if (mph >= 39){
// //     return "Tropical Storm";
// //   }
// //   else{
// //     return "Tropical Depression";
// //   }
// // }

// ViteExpress.listen(app, 3000)

import express from  'express'
import ViteExpress from 'vite-express'

const app = express()

const appdata = [
  {"Name": "Ayush", "Year": 2025, "Windspeed": 25, "Airpressure": 50}
]

app.use( express.json() )

app.get( '/read', ( req, res ) => res.json( appdata ) )

app.post( '/add', ( req,res ) => {
  appdata.push( req.body )
  res.json( appdata )
})
// app.post( '/change', function( req,res ) {
//   const idx = todos.findIndex( v => v.name === req.body.name )
//   appdata[ idx ].completed = req.body.completed
  
//   res.sendStatus( 200 )
// })

ViteExpress.listen( app, 3000 )