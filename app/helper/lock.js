export default class Lock {
  #isLocked;
  #queue;

  constructor() {
    this.#isLocked = null;
    this.#queue = [];
  }

  processQueue() {
    if (!this.#isLocked && this.#queue.length) {
      const {callback, readOnly} = this.#queue.shift();
      if (!readOnly) {
        this.#isLocked = true;
      }
      callback();
    }
  }

  async acquire({readOnly} = {readOnly: true}) {
    const waitForResolve = new Promise(resolve => {
      this.#queue.push({
        callback: resolve,
        readOnly
      });
    });

    this.processQueue();

    await waitForResolve;

    if (readOnly) {
      this.processQueue();
      return;
    }

    return () => {
      this.#isLocked = false;

      this.processQueue();
    };
  }
}