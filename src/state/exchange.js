import {useState, useCallback, useEffect} from 'react';
import {createContainer} from 'unstated-next';

export function useExchange() {
  const [rates, setRates] = useState({});

  const getRates = useCallback(async (base = 'USD') => {
    const response = await fetch(
      `https://openexchangerates.org/api/latest.json?app_id=b23eb99bc5e44fb2858629c71a8c11a5&base=${base}`,
    );
    const result = await response.json();
    if (response.ok) {
      setRates(result.rates);
    } else {
      throw new Error(result.error);
    }
  }, []);
  return {
    rates,
    getRates,
  };
}

const Exchange = createContainer(useExchange);

export default Exchange;
