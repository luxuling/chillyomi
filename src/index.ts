import 'module-alias/register';
// eslint-disable-next-line import/no-extraneous-dependencies
import chalk from 'chalk';
import app from '@config/app';
import createServer from '@lib/create_server';

const server = createServer();
server.listen(app.PORT, () =>
  console.log(chalk.cyan(`listening on ${app.URL}${app.PORT}`))
);
