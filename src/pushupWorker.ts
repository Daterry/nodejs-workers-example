import { doPushups } from './workouts';

const { parentPort } = require('worker_threads');

parentPort.on('message', async (message: any) => {
  await doPushups(message.reps);
  parentPort.postMessage('Done doing ' + message.reps);
});
