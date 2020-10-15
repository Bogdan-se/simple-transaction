import {Router} from 'express';

import {BalanceRouter} from './balance/_index';
import {TransactionRouter} from './transaction/_index';

export const ApiRouter = () => {
  const router = Router({mergeParams: true});

  router.use('/transaction', TransactionRouter());
  router.use('/balance', BalanceRouter());

  return router;
}