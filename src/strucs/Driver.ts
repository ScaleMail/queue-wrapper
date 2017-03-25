interface Driver {
  connect()

  disconnect()

  send(channel : string, message : string | Object)

  registerListener(channel : string, handler : Function)
}