import * as amqp from 'amqplib'
import RabbitMQMessage from './RabbitMQMessage';
import JSONTool from '../../utils/jsonTool';

export default class RabbitMQDriver implements Driver {
  options : DriverOptions;
  connection : any; // Set as any until typings are available
  channel : any;


  constructor(options : DriverOptions) {
    this.options = options;
  }

  async connect() {
    const { host, port, path, username, password } = this.options.connection;

    this.connection = amqp.connect(
      `amqp://${ username }:${ password }@${ host }:${ port }${ path }`,
      this.options.driverConfig
    );

    this.channel = await this.connection.createChannel();
  }

  disconnect() {
    this.connection.close(function(err) {
      if (err) {
        throw err;
      }
    })
  }

  send(channel : string, message : string | Object) {
    this.channel.assertQueue(channel);
    this.channel.sendToQueue(channel, new Buffer(JSONTool.wrap(message)));
  }

  async registerListener(channelName : string, handler : Function) {
    await this.channel.assertQueue(channelName);

    const _handler = (raw) => {
      if (!raw) { return; }

      const message = new RabbitMQMessage(raw, this.channel);

      handler(message);
    };

    _handler.bind(this);

    this.channel.consume(channelName, _handler);
  }
}