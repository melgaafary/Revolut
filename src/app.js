import React from 'react';
import reset from 'styled-reset';
import {createGlobalStyle} from 'styled-components';
import {Grommet} from 'grommet';

import Exchange from './containers/exchange';
import ExchangeState from './state/exchange';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;
const theme = {
  global: {
    font: {
      family: 'Geneva',
      size: '18px',
    },
  },
};

export default function App() {
  return (
    <Grommet full theme={theme}>
      <GlobalStyle />
      <ExchangeState.Provider>
        <Exchange />
      </ExchangeState.Provider>
    </Grommet>
  );
}
