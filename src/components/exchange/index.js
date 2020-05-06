import React from 'react';
import {number, string} from 'prop-types';
import styled from 'styled-components';
import {Box, Button, Text} from 'grommet';
import {LineChart, Transaction} from 'grommet-icons';
import CurrencyBox from './currency-box';
import CurrencyForm from './currency-form';
import {CURRENCY_ICON_MAP} from '../../constants/currencies';

const Header = styled.h1`
  font-size: 2.5rem;
  align-self: center;
  padding: 40px;
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const ExchangeButton = styled(Button)`
  background: #0667eb;
  height: 80px;
  width: 50%;
  border-radius: 50px;
  box-shadow: 0px 10px 24px 0px rgba(158, 202, 255, 1);
  outline: 0;
  border: none;
  &:hover {
    box-shadow: 0px 0px 0px 2px rgba(158, 202, 255, 1);
  }
`;
const RotatedBox = styled(Box)`
  transform: rotate(90deg);
  z-index: 10;
`;

export default function Exchange({
  availablePockets,
  onInGoingPocketChange,
  onOutGoingPocketChange,
  inGoingPocket,
  outGoingPocket,
  reversePockets,
  rate,
  form,
  error,
  onFormChange,
  onExchange,
}) {
  console.log(error);
  return (
    <Section>
      <Header>Exchange</Header>
      <Box
        fill
        direction="row"
        justify="between"
        pad={{horizontal: 'large', vertical: 'large'}}>
        <CurrencyBox
          pocket={inGoingPocket}
          availablePockets={availablePockets}
          onCurrencyChange={onInGoingPocketChange}
          error={error}
        />
        <CurrencyForm
          value={form.inGoing}
          onChange={onFormChange}
          name="inGoing"
          error={error}
        />
      </Box>
      <Box
        pad={{horizontal: 'large', vertical: 'medium'}}
        style={{position: 'relative'}}
        background="#F3F4F5"
        justify="between"
        fill>
        <Box
          style={{
            position: 'absolute',
            top: -25,
            left: 40,
            textAlign: 'center',
          }}>
          <RotatedBox
            background="#fff"
            border={{color: 'light-4'}}
            height="50px"
            width="50px"
            round="100%"
            align="center"
            justify="center"
            direction="row"
            gap="small">
            <Button
              onClick={reversePockets}
              icon={<Transaction color="#2d65e3" />}
              plain
            />
          </RotatedBox>
        </Box>
        <Box
          style={{
            position: 'absolute',
            top: -25,
            left: 0,
            right: 0,
            textAlign: 'center',
          }}>
          <Box
            round="20px"
            background="#fff"
            border={{color: 'light-4'}}
            width="35%"
            height="50px"
            align="center"
            justify="center"
            direction="row"
            gap="small"
            margin={{vertical: 0, horizontal: 'auto'}}>
            <LineChart color="#2d65e3" />
            <Text color="#2d65e3" size="large">
              1{CURRENCY_ICON_MAP[inGoingPocket.id]} ={' '}
              {parseFloat(rate).toFixed(4)}
              {CURRENCY_ICON_MAP[outGoingPocket.id]}
            </Text>
          </Box>
        </Box>
        <Box direction="row" pad={{vertical: 'large'}}>
          <CurrencyBox
            pocket={outGoingPocket}
            onCurrencyChange={onOutGoingPocketChange}
            availablePockets={availablePockets}
          />
          <CurrencyForm
            value={form.outGoing}
            onChange={onFormChange}
            name="outGoing"
          />
        </Box>
        <Box align="center">
          <ExchangeButton
            onClick={onExchange}
            disabled={error || !form.inGoing}
            label={
              <Text size="large" color="light-1">
                Exchange
              </Text>
            }
          />
        </Box>
      </Box>
    </Section>
  );
}
Exchange.defaultProps = {};

Exchange.propTypes = {};
