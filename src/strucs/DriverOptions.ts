interface DriverOptions {
  connection: {
    host: string,
    port: number | string,
    path: string,
    username: string,
    password: string
  },
  driverConfig: Object
}