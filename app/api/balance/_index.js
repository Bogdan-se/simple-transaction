import {Router} from 'express';

import {BalanceRetrieve} from './retrieve';

export const BalanceRouter = () => {
  const router = Router({mergeParams: true});

  router.get('/', BalanceRetrieve);

  return router;
};
