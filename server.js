import express from  'express'
import ViteExpress from 'vite-express'

const app = express()

const appdata = [
    { "name": "Total War: Warhammer III", "review": "Mostly Positive", "price": "59.99" },
]

app.use( express.json() )

app.post( '/remove', (req, res) => {

    res.end(JSON.stringify( req.body ) )
})

ViteExpress.listen( app, 3000 )