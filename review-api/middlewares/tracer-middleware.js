const jaeger = require("jaeger-client");
const UDPSender = require('jaeger-client/dist/src/reporters/udp_sender').default
const opentracing = require('opentracing');
const service =process.env.JAEGER_SERVICE_NAME||"Pizza-api";

const udpSender = new UDPSender()
const reporter = new jaeger.RemoteReporter(udpSender)
const sampler = new jaeger.RateLimitingSampler(1)
const tracer = new jaeger.Tracer(service, reporter, sampler)

module.exports =()=>{
  return (req, res, next)=> {
    // set parent context if needed
    const parentSpanContext = tracer.extract(opentracing.FORMAT_HTTP_HEADERS, req.headers);
    req.span = tracer.startSpan(service, {
      childOf: parentSpanContext
    });
    req.span.setTag(opentracing.Tags.HTTP_URL, `${req.protocol}://${req.hostname}${req.originalUrl}`)
    req.span.setTag(opentracing.Tags.HTTP_METHOD, req.method)
    req.span.setTag('request_path', req.path)
    req.span.setTag('request_id', req.headers['x-request-id']);
    // it will call on end
    res.on('finish', function() {
      req.span.setTag(opentracing.Tags.HTTP_STATUS_CODE, res.statusCode);    
      // check HTTP status code
      req.span.setTag(opentracing.Tags.ERROR, ((res.statusCode >= 500 ) ? true : false));
      // close the span
      req.span.finish();
    });
    next();
  }
}