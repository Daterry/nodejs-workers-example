const { isMainThread } = require('worker_threads');

export async function doPushups(reps: number): Promise<void> {
  let repsCounter: number = 0;
  isMainThread
    ? console.time('I did ' + reps + ' reps in')
    : console.time('My gym buddy did ' + reps + ' reps in');
  for (let rep = 0; rep < reps; rep++) {
    await delay(1000);
    repsCounter++;
    isMainThread
      ? console.log('I have done ' + repsCounter + ' reps')
      : console.log('My gym buddy has done ' + repsCounter + ' reps');
  }
  isMainThread
    ? console.timeEnd('I did ' + reps + ' reps in')
    : console.timeEnd('My gym buddy did ' + reps + ' reps in');
}

const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
