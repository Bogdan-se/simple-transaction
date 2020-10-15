import * as PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';

import {TransactionDataRow} from './transaction-data-row';

export const TransactionDetails = ({className, transaction}) => {
  const {id, type, amount, effectiveDate} = transaction;
   return <TableContainer className={className} component={Paper}>
    <Table>
      <TableBody>
        <TransactionDataRow label={'ID:'} value={id} />
        <TransactionDataRow label={'Type:'} value={type} />
        <TransactionDataRow label={'Amount:'} value={amount} />
        <TransactionDataRow label={'Date:'} value={new Date(effectiveDate).toLocaleString()} />
      </TableBody>
    </Table>
  </TableContainer>
};

TransactionDetails.propTypes = {
  className: PropTypes.string,
  transaction: PropTypes.object
};