import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../ducks';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, applyMiddleware(thunk), initialState);

  if (module.hot) {
    module.hot.accept('../ducks', () => {
      const nextReducer = require('../ducks');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
