import express from 'express'
import 'dotenv/config';
import bootstrap from './src/app.controller.js'
const app = express()
bootstrap(app, express);


const port = process.env.PORT
app.listen(port, () => console.log(`Example app listening on port ${port}!`))