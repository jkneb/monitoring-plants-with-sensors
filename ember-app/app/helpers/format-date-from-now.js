import Ember from 'ember';

export function formatDateFromNow(params) {
  return moment(params[0]).fromNow();
}

export default Ember.Helper.helper(formatDateFromNow);
