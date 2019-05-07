import React, { Component } from 'react';
import { connect } from 'react-redux';

import { increment, decrement, reset } from '../../../store/actions';

class CounterComp extends Component {
   render() {
      const { count, increment, decrement, reset } = this.props;
      return (
         <div>
            <style jsx>{`
               div {
                  padding: 0 0 20px 0;
               }
            `}</style>
            <h1>
               Count: <span>{count}</span>
            </h1>
            <button onClick={increment}>+1</button>
            <button onClick={decrement}>-1</button>
            <button onClick={reset}>Reset</button>
         </div>
      );
   }
}

export const Counter = connect(
   state => ({
      count: state.count,
   }),
   dispatch => ({
      increment: () => dispatch(increment()),
      decrement: () => dispatch(decrement()),
      reset: () => dispatch(reset()),
   }),
)(CounterComp);
