import { createStore } from 'redux';
import rootReducer from '../ducks';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../ducks', () => {
      const nextReducer = require('../ducks');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
