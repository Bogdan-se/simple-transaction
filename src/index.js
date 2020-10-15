import {useState, useEffect} from 'react';
import * as PropTypes from 'prop-types';
import axios from 'axios';

import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import {TransactionDetails} from './index/transaction-details';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '80%',
    margin: '0 auto'
  },
  heading: {
    margin: '20px auto',
    'text-align': 'center'
  },
  debit: {
    backgroundColor: theme.palette.success.light
  },
  credit: {
    backgroundColor: theme.palette.error.light
  },
  capitalize: {
    'text-transform': 'capitalize'
  }
}));

const Index = ({className}) => {
  const classes = useStyles();

  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await axios('/api/v1/transaction');

      setTransactions(result.data);
    })();
  }, []);

  const [expanded, setExpanded] = useState();
  const handleExpand = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className={`${className} ${classes.wrapper}`}>
      <Typography className={classes.heading} variant='h3' component='h2'>
        Transactions history
      </Typography>
      {transactions.map((transaction) =>
        <Accordion
          key={transaction.id}
          expanded={expanded === transaction.id}
          onChange={handleExpand(transaction.id)}
        >
          <AccordionSummary className={classes[transaction.type]} expandIcon={<ExpandMoreIcon/>}>
            <Typography>
              <span className={classes.capitalize}>{transaction.type}</span>: {transaction.amount}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TransactionDetails transaction={transaction} />
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  )
};

Index.propTypes = {
  className: PropTypes.string
};

export default Index;