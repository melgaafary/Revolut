import React, {useState, useEffect} from 'react';
import ExchangeScreen from '../components/exchange/';
import ExchangeState from '../state/exchange';
import useInterval from '../hooks/interval';
import {isValidCurrency} from '../utils';

const INITIAL_STATE = {
  USD: {
    balance: 432,
    id: 'USD',
  },
  EUR: {
    balance: 300,
    id: 'EUR',
  },
  GBP: {
    balance: 21,
    id: 'GBP',
  },
};

export default function Exchange() {
  const [pockets, setPockets] = useState(INITIAL_STATE);
  const [inGoingPocket, setInGoingPocket] = useState(pockets.USD);
  const [outGoingPocket, setOutGoingPocket] = useState(pockets.EUR);
  const [form, setForm] = useState({inGoing: '', outGoing: ''});
  const [error, setError] = useState(null);
  const [rate, setRate] = useState(0);
  const {getRates, rates} = ExchangeState.useContainer();

  useEffect(() => {
    // Change the base is not for free users
    // But code should work to support it
    //getRates(inGoingPocket.id);
    getRates();
  }, []);
  useEffect(() => {
    // Have to do this to calculate other rates
    // Since the api doesnt support that for free
    setRate(
      inGoingPocket.id === 'USD'
        ? rates[outGoingPocket.id]
        : rates[outGoingPocket.id] / rates[inGoingPocket.id],
    );
  }, [inGoingPocket.id, outGoingPocket.id, rates]);

  useInterval(() => {
    getRates();
  }, 10000);

  const reversePockets = () => {
    const inGoingPocketId = inGoingPocket.id;
    setInGoingPocket(outGoingPocket);
    setOutGoingPocket(pockets[inGoingPocketId]);
    setForm({inGoing: form.outGoing, outGoing: form.inGoing});
  };
  const onInGoingPocketChange = pocketId => {
    if (pocketId === outGoingPocket.id) {
      return reversePockets();
    }

    setInGoingPocket(pockets[pocketId]);
  };
  const onOutGoingPocketChange = pocketId => {
    if (pocketId === inGoingPocket.id) {
      return reversePockets();
    }

    setOutGoingPocket(pockets[pocketId]);
  };
  const onExchange = () => {
    setInGoingPocket({
      ...inGoingPocket,
      balance: Number(inGoingPocket.balance) - Number(form.inGoing),
    });
    setOutGoingPocket({
      ...outGoingPocket,
      balance: Number(outGoingPocket.balance) + Number(form.outGoing),
    });
    setForm({inGoing: '', outGoing: ''});
  };
  const onFormChange = e => {
    const {
      target: {name, value},
    } = e;
    const rateValue = isValidCurrency(value * rate) || '';
    const validatedValue = isValidCurrency(value);
    if (value > inGoingPocket.balance || rateValue > inGoingPocket.balance) {
      setError('Exceeds limit');
    } else {
      setError(null);
    }
    if (name === 'inGoing') {
      setForm({
        inGoing: validatedValue,
        outGoing: rateValue,
      });
    } else {
      setForm({
        inGoing: rateValue,
        outGoing: validatedValue,
      });
    }
  };

  return (
    <ExchangeScreen
      inGoingPocket={inGoingPocket}
      outGoingPocket={outGoingPocket}
      onInGoingPocketChange={pocketId => onInGoingPocketChange(pocketId)}
      onOutGoingPocketChange={pocketId => onOutGoingPocketChange(pocketId)}
      reversePockets={reversePockets}
      availablePockets={pockets}
      rate={rate}
      onFormChange={onFormChange}
      form={form}
      error={error}
      onExchange={onExchange}
    />
  );
}
