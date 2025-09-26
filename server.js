import express from  'express'
import ViteExpress from 'vite-express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const appdata = [
    { "firstName": "John", "lastName": "Doe", "address": "421 Doe Street", "shirts":1,"jackets":0,"hats":1,"totalPrice":20},
    { "firstName": "Kevin", "lastName": "McClain", "address": "321 Johnson Ave", "shirts":2,"jackets":0,"hats":0,"totalPrice":30},
    { "firstName": "Peter", "lastName": "Ohio", "address": "5 Green Boulevard", "shirts":1,"jackets":1,"hats":1,"totalPrice":55}
]

app.use( express.json() )

app.get( '/read', ( req, res ) => res.json( appdata ) )

app.post( '/add', ( req,res ) => {
    const temp = appdata.length;
    appdata.push( req.body )
    console.log( appdata)
    res.json( appdata.length > temp?{"message":"Successfully added entry", "entry":req.body}:{"message":"ERROR: failed to add entry"})
})

app.post( '/change', function( req,res ) {
    const idx = appdata.findIndex( v => v.name === req.body.name )
    appdata[ idx ].completed = req.body.completed

    res.sendStatus( 200 )
})

app.delete( '/delete', ( req,res ) => {
    const idx = req.body.row;
    appdata.splice(idx, 1);
    console.log(appdata)
    res.sendStatus( 200 )
})

ViteExpress.listen( app, 3000 )