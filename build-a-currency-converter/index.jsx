const { useState, useMemo } = React;

const currencies = [
    'EUR',
    'USD',
    'JPY',
    'GBP'
];

const currencyMapping = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    JPY: 156.7
};

export function CurrencyConverter() {

    const [amount, setAmount] = useState(1);
    const [startCurrency, setStartCurrency] = useState('USD');
    const [targetCurrency, setTargetCurrency] = useState('EUR');

    const amountInUSD = useMemo(() => {
        if (!startCurrency) return 0;
        return Number(amount) / currencyMapping[startCurrency];
    }, [amount, startCurrency]);

    const convertedAmount = targetCurrency
        ? (amountInUSD * currencyMapping[targetCurrency]).toFixed(2)
        : '0.00';

    return (
        <div className='form-wrap'>
            <h1>Currency Converter</h1>
            {startCurrency && targetCurrency && (
                <p>{startCurrency} to {targetCurrency} Conversion</p>
            )}

            <form>
                <label htmlFor="amount">Amount</label>
                <input
                    id="amount"
                    type='number'
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                /><br />

                <label htmlFor="start">Start Currency:</label>
                <select id="start" value={startCurrency} onChange={e => setStartCurrency(e.target.value)}>
                    {currencies.map(source => (
                        <option key={source} value={source}>
                            {source}
                        </option>
                    ))}
                </select><br />

                <label htmlFor="target">Target Currency:</label>
                <select id="target" value={targetCurrency} onChange={e => setTargetCurrency(e.target.value)}>
                    {currencies.map(source => (
                        <option key={source} value={source}>
                            {source}
                        </option>
                    ))}
                </select><br />

            </form>

            {startCurrency && targetCurrency && (
                <p>{convertedAmount} {targetCurrency}</p>
            )}

        </div>
    )
}