import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Main from '../components/Main';
import * as MortgageActions from '../ducks/mortgage';
import * as OverpaymentActions from '../ducks/overpayments';

import { calculatePayments } from '../helpers/mortgage';

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

export default connect(state=>state)(App);
