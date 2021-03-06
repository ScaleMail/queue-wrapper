import JSONTool from '../../utils/jsonTool';

export default class RabbitMQMessage implements Message {
  msg : any;
  channel : any;

  constructor(msg : any, channel: any) {
    this.msg = msg;
    this.channel = channel;
  }

  getBody() {
    const body = this.msg.content.toString();

    return JSONTool.unwrap(body);
  }

  ack() {
    this.channel.ack(this.msg);
  }

  nack() {
    this.channel.nack(this.msg);
  }
}