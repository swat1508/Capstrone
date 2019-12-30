const express = require('express'),
helmet = require('helmet'),
cors=require('cors'),
bodyParser 	= require('body-parser'),
tracing =require('@opencensus/nodejs');

const exporter=require("./middlewares/jaeger-exporter");
tracing.registerExporter(exporter).start();

const app = express();
// get config data
const session = require('./session/session'),
 routers = require('./routes/router'),
 database = require('./db-connection'),
 passport = require("./passport/auth"),
 userAuth=require("./middlewares/user-authentication"),
 tracer=require("./middlewares/tracer-middleware");
// for application securtiy 
app.use(helmet());
app.use(cors());
// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

app.use(userAuth());
//app.use(tracer());
// other app to initalize
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
// enabling router
app.use('/auth', routers.authRouter);
app.use('/user', routers.userRouter);
app.use('/admin', routers.adminRouter);
// checking health of the application 
// app.get('/health', (req, res) => {
//   res.status(200).send();
// });
// app.get('/ready', (req, res) => {
//   res.status(200).send();
// });
database.then((result)=>{
  const port = process.env.PORT || 3001;
  app.listen(port, function() {
    console.log('listening on',port);
  });
}).catch((error)=>{
  console.error(error);
})
