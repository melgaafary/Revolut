import React from 'react';
import {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import CurrencyForm from '../../../components/exchange/currency-form';

describe('[Component] CurrencyForm', () => {
  const mockOnChange = jest.fn();
  it('should match the snapshot', () => {
    const component = <CurrencyForm name="inGoing" onChange={mockOnChange} />;
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should show correct ingoing value', () => {
    const component = mount(
      <CurrencyForm value={200} name="inGoing" onChange={mockOnChange} />,
    );
    expect(component.find('input[type="number"]').props().value).toEqual(200);
    expect(component.find('span').text()).toEqual('-');
  });
  it('should show correct outgoing value', () => {
    const component = mount(
      <CurrencyForm value={200} name="outGoing" onChange={mockOnChange} />,
    );
    expect(component.find('input[type="number"]').props().value).toEqual(200);
    expect(component.find('span').text()).toEqual('+');
  });
  it('should show error', () => {
    const component = mount(
      <CurrencyForm
        value={200}
        name="outGoing"
        onChange={mockOnChange}
        error="Exceeds limit"
      />,
    );
    expect(
      component
        .find('span')
        .last()
        .text(),
    ).toEqual('Exceeds limit');
  });
});
