import express from  'express'
import ViteExpress from 'vite-express'

const app = express()

const appdata = [
    { "name": "Total War: Warhammer III", "review": "Mostly Positive", "price": "59.99" },
]

app.use( express.json() )

app.get('/appdata', (req, res) => {
    res.writeHeader( 200, { "Content-Type": JSON })
    res.end( JSON.stringify(appdata) );
})

app.post( '/remove', (req, res) => {

    const rowToRemove = req.body

    appdata.splice( rowToRemove, 1 )

    req.writeHead( 200, "OK", {"Content-Type": JSON })
    res.end(JSON.stringify(appdata))
})

app.post('/add', (req, res) => {
    const data = req.body

    appdata.push( data )
    console.log( appdata )

    res.writeHead( 200, "OK", {"Content-Type": JSON })
    res.end(JSON.stringify(appdata))
})

ViteExpress.listen( app, 3001 )