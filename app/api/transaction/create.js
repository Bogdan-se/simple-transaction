import {middleware} from 'app/helper/middleware';
import {route} from 'app/helper/route';

import Transaction from 'app/helper/transaction';

import {validateCreate} from './validate';

export const TransactionCreate = [
  middleware(validateCreate),
  route(async (req) => {
    const {type, amount} = req.body;

    return Transaction.create({type, amount});
  })
];
