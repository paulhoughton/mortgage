import React from 'react';
import ReactDom from 'react-dom';
import App from './App';


import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';

(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: '607a030de00b830bbb2020e5',
    user: {
      "key": "Actual-chart",
      "name": "Tyler Nguyen",
      "email": "tydnguyen@ucdavis.edu"
    },
    options: { /* ... */ }
  });

  ReactDom.render(
    <LDProvider>
      <App />
    </LDProvider>,
    document.getElementById('root'),
  );
})();