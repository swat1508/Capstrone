const jaeger = require("jaeger-client");
const UDPSender = require('jaeger-client/dist/src/reporters/udp_sender').default
const opentracing = require('opentracing');
const service =process.env.JAEGER_SERVICE_NAME||"user-api";

const udpSender = new UDPSender()
const reporter = new jaeger.RemoteReporter(udpSender)
const sampler = new jaeger.RateLimitingSampler(1)
const tracer = new jaeger.Tracer(service, reporter, sampler)

module.exports =()=>{
  return (req, res, next)=> {
    console.log(3,service);
    // set parent context if needed
    const parentSpanContext = tracer.extract(opentracing.FORMAT_HTTP_HEADERS, req.headers);
    const span = tracer.startSpan(service, {
      childOf: parentSpanContext
    });
    span.setTag(opentracing.Tags.HTTP_URL, `${req.protocol}://${req.hostname}${req.originalUrl}`)
    span.setTag(opentracing.Tags.HTTP_METHOD, req.method)
    span.setTag('request_path', req.path)
    span.setTag('request_id', req.headers['x-request-id']);
    req.span=span;
    // it will call on end
    res.on('finish', function() {
      span.setTag(opentracing.Tags.HTTP_STATUS_CODE, res.statusCode);    
      // check HTTP status code
      span.setTag(opentracing.Tags.ERROR, ((res.statusCode >= 500 ) ? true : false));
      // close the span
      console.log(5,service,"ended here");
      span.finish();
    });
    next();
  }
}