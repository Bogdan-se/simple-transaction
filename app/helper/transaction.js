import {v4 as uuid} from 'uuid';

import Lock from 'app/helper/lock';
import {HttpError} from 'app/helper/http-error';

class Transaction {
  #balance;
  #transactions;
  #lock;

  constructor() {
    this.#balance = 0;
    this.counter = 1;
    this.#transactions = new Map();
    this.#lock = new Lock();
  }

  async getTransactions() {
    await this.#lock.acquire();
    return Array.from(this.#transactions.values());
  }

  async getBalance() {
    await this.#lock.acquire();
    return this.#balance;
  }

  async retrieve({transactionId}) {
    await this.#lock.acquire();
    return this.#transactions.get(transactionId);
  }

  async create({type, amount}) {
    let release;
    try {
      release = await this.#lock.acquire({readOnly: false});
      this._validateBalance({type, amount});

      const key = this._generateKey();

      const transaction = {
        id: key,
        type,
        amount,
        effectiveDate: new Date().toISOString()
      };

      this.#transactions.set(key, transaction);
      this._updateBalance({type, amount});

      return transaction;
    } finally {
      release && release();
    }
  }

  _validateBalance({type, amount}) {
    if (type === 'credit' && this.#balance < amount) {
      throw new HttpError(402, 'Not enough money');
    }

    return true;
  }
  _updateBalance({type, amount}) {
    if (type === 'credit') {
      return this.#balance -= amount;
    }

    return this.#balance += amount;
  }

  _generateKey () {
    while (true) {
      const key = uuid();
      if (!this.#transactions.has(key)) {
        return key;
      }
    }
  }
}

export default new Transaction();