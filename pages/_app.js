import 'styles/globals.css'
import * as PropTypes from 'prop-types';

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object
};

export default App
