import {route} from 'app/helper/route';

import Transaction from 'app/helper/transaction';

export const BalanceRetrieve = route(async () => {
  return {
    balance: await Transaction.getBalance()
  };
});
