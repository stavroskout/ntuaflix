const express = require('express');
const cors = require('cors');
const home = require('./routes/home')
const admin = require ('./routes/admin')
const formatMiddleware = require('./controllers/formatMiddleware')
const https = require('https');
const fs = require('fs')
const cookieParser = require('cookie-parser')
const login = require('./controllers/login')
const admin_auth = require('./controllers/admin_authorization')
const user_auth = require('./controllers/user_authorization');
const test = require('./controllers/test');
const insertuser = require('./controllers/insertuser');

const port = 9876
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Set this to your actual frontend domain
    credentials: true,
}))
app.use(express.json())
app.use(formatMiddleware)
app.use(cookieParser())
app.use('/ntuaflix_api/admin', admin_auth)
app.use('/ntuaflix_api/', user_auth)
///
app.get('/test', test)
///
app.post('/signup/:username/:email/:pwd', insertuser)
app.post('/login/:username/:email/:pwd', login)
app.use('/ntuaflix_api/admin', admin)
app.use('/ntuaflix_api/', home)
app.use((req,res) => {
    res.status(400).json({
        status: 400,
        message: "Bad Request"
    })
})

const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, ()=>{
    console.log(`App running and listening on port ${port}`)
})
