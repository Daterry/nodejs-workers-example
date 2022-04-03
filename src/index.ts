import express, { Request, Response } from 'express';
import { doPushups } from './workouts';
const app = express();
const port = 3000;
const { Worker } = require('worker_threads');

app.listen(port, () => {
  return console.log(
    `Express is starting the workout at http://localhost:${port}`
  );
});

app.get(
  '/do-pushups-together',
  async (req: Request, res: Response) => {
    if (!req.query.reps) return res.sendStatus(404);
    const worker = createWorker(__dirname + '/pushupWorker.ts');
    const totalReps: number = parseInt(req.query.reps as string);
    console.time('total workout duration');
    await Promise.all([
      doPushups(totalReps / 2),
      workerFriend(totalReps / 2, worker),
    ]);
    console.timeEnd('total workout duration');
    return res.sendStatus(200);
  }
);

const createWorker = (taskPath: string) => {
  const worker = new Worker(__dirname + '/workerGateway.js', {
    workerData: { path: taskPath },
  });
  return worker;
};

const workerFriend = (numberOfPushup: number, worker: any) => {
  return new Promise((resolve, reject) => {
    worker.postMessage({ reps: numberOfPushup });
    worker.on('message', (result: any) => {
      resolve(result);
    });

    worker.on('error', (err: any) => {
      reject(err);
    });
  });
};
