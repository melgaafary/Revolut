import React, {useState} from 'react';
import {func, string, number, shape, object} from 'prop-types';
import {Down} from 'grommet-icons';
import {Layer, Box, Text, Button} from 'grommet';
import styled from 'styled-components';
import {CURRENCY_ICON_MAP} from '../../constants/currencies';

const StyledLayer = styled(Layer)`
  border-radius: 20px;
  background-color: transparent;
  display: flex;
  align-items: center;
`;

const CancelButton = styled(Button)`
  background: #fff;
  width: 90%;
  border: none;
  margin: 10px;
  height: 80px;
`;

export default function CurrencyBox({
  pocket,
  availablePockets,
  onCurrencyChange,
  error,
}) {
  const [showCurrencyModal, setCurrencyModal] = useState(false);
  return (
    <Box fill>
      <Box direction="row" align="center" gap="small">
        <Text size="xlarge">{pocket.id}</Text>
        <Button plain onClick={() => setCurrencyModal(true)} label={<Down />} />
      </Box>
      <Text color={error ? 'status-critical' : 'light-4'} size="large">
        Balance: {parseFloat(pocket.balance).toFixed(2)}{' '}
        {CURRENCY_ICON_MAP[pocket.id]}
      </Text>
      {showCurrencyModal && (
        <StyledLayer
          full="horizontal"
          position="bottom"
          margin={{bottom: 'large'}}
          onClickOutside={() => setCurrencyModal(false)}>
          <Box round="10px" width="90%" background="light-1">
            <Box pad="medium" border={{side: 'bottom', color: 'light-4'}}>
              <Text color="#9aa3ab" size="large">
                Choose currency:
              </Text>
            </Box>
            {Object.values(availablePockets).map(({id}) => (
              <Box
                pad="medium"
                border={{side: 'bottom', color: 'light-4'}}
                key={id}>
                <Button
                  onClick={() => {
                    onCurrencyChange(id);
                    setCurrencyModal(false);
                  }}>
                  <Box align="start">
                    <Text size="xlarge">{id}</Text>
                  </Box>
                </Button>
              </Box>
            ))}
          </Box>
          <CancelButton
            onClick={() => setCurrencyModal(false)}
            label={
              <Text size="large" color="#005bea">
                Cancel
              </Text>
            }
          />
        </StyledLayer>
      )}
    </Box>
  );
}

CurrencyBox.defaultProps = {
  error: null,
  availablePockets: {},
};

CurrencyBox.propTypes = {
  pocket: shape({balance: number.isRequired, id: string.isRequired}),
  onCurrencyChange: func.isRequired,
  error: string,
  availablePockets: object,
};
