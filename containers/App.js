import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Main from '../components/Main';
import * as MortgageActions from '../actions/mortgageActions';

class App extends Component {
  render() {
    const { calculations, dispatch } = this.props;
    const actions = bindActionCreators(MortgageActions, dispatch);

    return (
      <div>
        <Header title={"Mortgage Overpayment Calculator"} />
        <Main 
          {...calculations}
          actions={actions} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {calculations:state.calculations};
}

export default connect(mapStateToProps)(App);
