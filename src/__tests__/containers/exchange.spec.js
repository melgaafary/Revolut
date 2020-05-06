import React from 'react';
import renderer from 'react-test-renderer';
import Exchange from '../../containers/exchange';
import ExchangeState from '../../state/exchange';

describe('[Container] Exchange', () => {
  it('should match the snapshot', () => {
    const component = (
      <ExchangeState.Provider>
        <Exchange />
      </ExchangeState.Provider>
    );
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
