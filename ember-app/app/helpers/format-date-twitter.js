import Ember from 'ember';

export function formatDateTwitter(params) {
  return moment(params[0]).twitterLong();
}

export default Ember.Helper.helper(formatDateTwitter);
