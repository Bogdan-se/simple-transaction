import {Router} from 'express';

import {TransactionCreate} from './create';
import {TransactionList} from './list';
import {TransactionRetrieve} from './retrieve';

export const TransactionRouter = () => {
  const router = Router({mergeParams: true});

  router.get('/', TransactionList);
  router.post('/', TransactionCreate);
  router.get('/:transactionId', TransactionRetrieve);

  return router;
};
