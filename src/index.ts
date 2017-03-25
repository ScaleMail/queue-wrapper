import { DEFAULT_DRIVER, DEFAULT_DRIVER_OPTIONS } from './defaults/index';

const supportedDrivers = [ `rabbitmq` ];

export default class QueueWrapper {
  driver : Driver;

  constructor(driver : string = DEFAULT_DRIVER, options : DriverOptions = DEFAULT_DRIVER_OPTIONS) {
    if (!supportedDrivers.indexOf(driver)) {
      throw new Error(`${ driver } is not a supported driver.`);
    }

    this.driver = require(`./drivers/${ driver }`);
  }

  connect() {
    
  }

  disconnect() {}

  send(channel : string = ``, message : string | Object = ``) {

  }

  addListener(channel : string, handler : Function) {

  }
}