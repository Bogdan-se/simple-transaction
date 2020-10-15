import {validate} from 'uuid';

import {HttpError} from 'app/helper/http-error';

export const validateCreate = (req) => {
  const {type, amount} = req.body;

  if (!['credit', 'debit'].includes(type)) {
    throw new HttpError(400, 'Transaction type not supported');
  }

  if (isNaN(amount)) {
    throw new HttpError(400, `Amount should be a number`);
  }

  if (amount < 0) {
    throw new HttpError(400, `Amount can't be negative`);
  }
};

export const validateRetrieve = (req) => {
  const {transactionId} = req.params;

  if (!validate(transactionId)) {
    throw new HttpError(400, 'Incorrect format of transaction id');
  }
};