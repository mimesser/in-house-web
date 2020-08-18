import moment from 'moment';

export const formatDate = (date) => moment(date).format('MM/DD/YYYY');

export const formatDateTime = (date) => moment(date).format('MM.DD.YYYY / LT');

export const formatRating = (rating) => Number.parseFloat(rating).toFixed(1);
