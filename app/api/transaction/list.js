import {route} from 'app/helper/route';

import Transaction from 'app/helper/transaction';

export const TransactionList = route(async () => {
  return Transaction.getTransactions();
});
