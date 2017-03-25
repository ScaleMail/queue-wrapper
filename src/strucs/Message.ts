interface Message {
  msg : any;
  channel: any;

  getBody() : string | Object

  ack();

  nack();
}