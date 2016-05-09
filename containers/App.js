import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Main from '../components/Main';
import * as MortgageActions from '../ducks/mortgage';
import * as OverpaymentActions from '../ducks/overpayments';

import { calculatePayments } from '../helpers/mortgage';
import '../styles/App.scss';

class App extends React.Component {
  render() {
    const { mortgage, overpayments, dispatch } = this.props;
    const actions = bindActionCreators({ ...MortgageActions, ...OverpaymentActions }, dispatch);
    return (
      <div>
        <Header title={"Mortgage Overpayment Calculator"} />
        <Main
          {...mortgage}
          overpayments={overpayments}
          { ...calculatePayments({ ...mortgage, overpayments }) }
        actions={actions} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(App);
