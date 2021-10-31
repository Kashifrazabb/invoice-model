import express from "express"
import { config } from "dotenv"
import router from "./route.js"
import path from "path"
import './db.js'

config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(path.resolve(), "assets")))
app.set('view engine', 'ejs')
app.use(router)

const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'))
    app.get('*', (req, res) => res.sendFile('build/index.html'))
}

app.listen(PORT, () => console.log(`App is listening at ${PORT}...`))