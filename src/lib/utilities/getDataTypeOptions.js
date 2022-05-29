import { format as formatValue } from '@lib/utilities';

export default (type) => {
  let classes, format;

  if (type === 'currency') {
    classes = 'text-right';
    format = (v) => formatValue.currency(v);
  }
  if (type === 'date') {
    classes = 'text-right';
    format = (v) => {
      let formattedValue;
      try {
        formattedValue = formatValue.date(new Date(v));
        return formattedValue;
      } catch (error) {
        return 'ERROR';
      }
    };
  }
  if (type === 'number-fixed2') {
    classes = 'text-right';
    format = (v) => (Math.round(+(v * 100)) / 100).toFixed(2);
  }
  if (type === 'number') {
    classes = 'text-right';
    format = (v) => v;
  }
  if (type === 'string') {
    classes = '';
    format = (v) => v;
  }

  return { classes, format };
};
