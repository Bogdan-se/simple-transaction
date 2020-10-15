import {middleware} from 'app/helper/middleware';
import {route} from 'app/helper/route';

import {HttpError} from 'app/helper/http-error';
import Transaction from 'app/helper/transaction';

import {validateRetrieve} from './validate';

export const TransactionRetrieve = [
  middleware(validateRetrieve),
  route(async (req) => {
    const {transactionId} = req.params;

    const transaction = await Transaction.retrieve({transactionId});

    if (!transaction) {
      throw new HttpError(404, 'Transaction not found');
    }

    return transaction;
  })
];