const express = require('express'),
helmet = require('helmet'),
cors=require('cors'),
bodyParser 	= require('body-parser'),
ExpressGraphQL = require("express-graphql"),
tracing =require('@opencensus/nodejs');

const exporter=require("./middlewares/jaeger-exporter");
tracing.registerExporter(exporter).start();

const app = express();
// get config data
const database = require('./mongoose/db.connection'),
graphqlSchema=require("./graphql/schema"),
router=require("./routers/routes"),
tracer=require("./middlewares/tracer-middleware"),
userAuth=require("./middlewares/user-authentication");
// for application securtiy 
app.use(helmet());
app.use(cors());
// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.use(tracer());
app.use(userAuth());
// exprss router
app.use("/feedback",router.feedbackRouter);
app.use("/restaurant",router.restoRouter);
//app.use("/admin",router.adminRouter);
// graphql middile ware
app.use("/graphql", ExpressGraphQL({
  schema: graphqlSchema,
  graphiql: true
}));
// app.get('/health', (req, res) => {
//   res.status(200).send();
// });
// app.get('/ready', (req, res) => {
//   res.status(200).send();
// });
database.then((result)=>{
  const port = process.env.PORT || 8000;
  app.listen(port, function() {
    console.log('listening on',port);
  });
}).catch((error)=>{
  console.error(error);
})
