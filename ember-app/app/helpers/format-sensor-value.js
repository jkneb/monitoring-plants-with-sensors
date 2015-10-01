import Ember from 'ember';

export function formatSensorValue(params) {
  function isFloat(n){
    return n === Number(n) && n % 1 !== 0;
  }
  var str = '';
  var value = params[0];
  if (isFloat(value)) {
    str = `<span class="value__main">${params[0].toString().split('.')[0]}</span>
          <span class="value__decimals">.${params[0].toString().split('.')[1]}</span>`;
  } else {
    str = '<span class="value__main">${value}</span>';
  }
  return Ember.String.htmlSafe(str);
}

export default Ember.Helper.helper(formatSensorValue);
