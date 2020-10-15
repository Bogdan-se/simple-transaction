import * as PropTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const TransactionDataRow = ({className, label, value}) => {
  return <TableRow className={className}>
    <TableCell>{label}</TableCell>
    <TableCell>{value}</TableCell>
  </TableRow>
};

TransactionDataRow.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};