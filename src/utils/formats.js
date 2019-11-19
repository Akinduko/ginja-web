/* eslint-disable prefer-template */
import moment from 'moment';

export const getHumanTime = date => {
  return moment(date).fromNow();
};

export const getTime = date => {
  return moment(date).format('LT');
};

export const getDate = date => {
  return moment(date).format('LL');
};

export const formatAmount = value => `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
