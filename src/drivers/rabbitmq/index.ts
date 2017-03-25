import * as amqp from 'amqplib'
import RabbitMQMessage from './RabbitMQMessage';

export default class RabbitMQDriver implements Driver {
  options : DriverOptions;
  connection : any; // Set as any until typings are available

  constructor(options : DriverOptions) {
    this.options = options;
  }

  connect() {
    const { host, port, path, username, password } = this.options.connection;

    this.connection = amqp.connect(
      `amqp://${ username }:${ password }@${ host }:${ port }${ path }`,
      this.options.driverConfig
    );
  }

  disconnect() {}

  send(channel : string, message : string | Object) {}

  async registerListener(channelName : string, handler : Function) {
    const channel = await this.connection.createChannel();

    await channel.assertQueue(channelName);

    channel.consume(channelName, function(raw) {
      if (!raw) { return; }

      const message = new RabbitMQMessage(raw, channel);

      handler(message);
    });
  }
}