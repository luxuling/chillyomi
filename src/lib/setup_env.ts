import * as dotenv from 'dotenv';

class Env {
  static set(path = './.env') {
    dotenv.config({ path });
  }
}

export default Env;
