import React from 'react';
import {number, string} from 'prop-types';
import {Down} from 'grommet-icons';
import {Box, Text} from 'grommet';
import styled from 'styled-components';
import AutosizeInput from 'react-input-autosize';

const StyledInput = styled.input`
  border: none;
  outline: none;
  font-size: 2.5rem;
  background: transparent;
`;
export default function CurrencyForm({value, onChange, name, error}) {
  return (
    <Box fill align="end">
      <Box direction="row">
        <Box pad={{top: '10px', right: '10px'}}>
          {value ? (
            <Text size="xlarge">{name === 'inGoing' ? '-' : '+'}</Text>
          ) : (
            ''
          )}
        </Box>
        <Box>
          <StyledInput
            type="number"
            placeholder="0"
            value={value}
            onChange={onChange}
            name={name}
          />
        </Box>
      </Box>
      {error && <Text color="light-4">{error}</Text>}
    </Box>
  );
}
