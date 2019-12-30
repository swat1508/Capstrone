const { JaegerTraceExporter } =require('@opencensus/exporter-jaeger');

const options = {
  serviceName: 'Pizza_Api',
  tags: [], // optional
  host: 'localhost', // optional
  port: 6832, // optional
  maxPacketSize: 65000 // optional
}
module.exports = new JaegerTraceExporter(options);