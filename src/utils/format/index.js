import moment from 'moment';

export const formatDate = (date) => moment.utc(date).local().format('MM/DD/YYYY');

export const formatDateTime = (date) => moment.utc(date).local().format('MM/DD/YYYY / LT');

export const formatRating = (rating) => Number.parseFloat(rating).toFixed(1);
export const formatMovementURL = (name) => `,)${name.replaceAll(' ', '_')}`;

export const pluralFormatVote = (count) => (+count === 1 ? 'vote' : 'votes');
export const pluralFormatRatings = (count) => (+count === 1 ? 'rating' : 'ratings');
