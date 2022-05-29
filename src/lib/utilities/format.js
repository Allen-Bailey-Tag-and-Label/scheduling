const { format: currency } = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const { format: date } = new Intl.DateTimeFormat();

export default { currency, date };
