import moment from 'moment';

/**
 * @description
 * A function that takes a date string and returns
 * a formatted date string 
 * 
 * @param {string} date a date string that can be "MM/DD/YYYY" or
 * "MM-DD-YYYY" or Date() or Date.now()
 * @returns {string} a formatted date string like "MM/DD/YYYY"
 * 
 * @example
 * formatDate(Date.now())
 * // return "11/11/2021"
 */
export const formatDate = (date) => moment.utc(date).local().format('MM/DD/YYYY');

/**
 * @description
 * A function that takes a date string or Date.now() and returns
 * a formatted date string with the local time * 
 * 
 * @param {string} date a date string that can be "MM/DD/YYYY" or
 * "MM-DD-YYYY" or Date() or Date.now()
 * @returns a formatted date string like "MM/DD/YYYY / HH:MM"
 * 
 * @example
 * formatDateTime(Date.now())
 * // return "11/11/2021 / 7:46 PM"
 */
export const formatDateTime = (date) => moment.utc(date).local().format('MM/DD/YYYY / LT');

/**
 * @description
 * A function that takes a number or string of number 
 * and returns a fixed number
 * 
 * @param {(number|string)} rating a number or string of number 
 * @returns {number} a fixed number
 * 
 * @example 
 * formatRating(1.34)
 * //returns 1.3
 * 
 * formatrating("1.36")
 * //returns1.4
 */
export const formatRating = (rating) => Number.parseFloat(rating).toFixed(1);

/**
 * @description
 * A function that takes a string and returns a new string
 * that its empty spaces is replaced by _(underscore)
 * 
 * @param {string} name a string  
 * @returns {string} a new string that has underscores instead of empty spaces 
 * 
 * @example
 * formatMovementURL("my new url")
 * //returns ",)my_new_url"
 * 
 */
export const formatMovementURL = (name) => `,)${name?.replaceAll(' ', '_')}`;

/**
 * @description 
 * A function that takes a number or string of number 
 * and returns 'vote' if number <=1 or 'votes if number >=2 
 * 
 * @param {number} count a number or string of number 
 * @returns {string} 'vote' if count <=1 or 'votes' if count >= 2 
 * 
 * @example
 * pluralFormatVote(1)
 * //returns 'vote'
 * 
 * pluralFormatVote(2)
 * //returns 'votes'
 */
export const pluralFormatVote = (count) => (+count === 1 ? 'vote' : 'votes');

/**
 * @description 
 * A function that takes a number or string of number 
 * and returns 'rating' if number <=1 or 'ratings' if number >=2 
 * 
 * @param {number} count a number or string of number 
 * @returns {string} 'rating' if count <=1 or 'ratings' if count >= 2 
 * 
 * @example
 * pluralFormatVote(1)
 * //returns 'rating'
 * 
 * pluralFormatVote(2)
 * //returns 'ratings'
 */
export const pluralFormatRatings = (count) => (+count === 1 ? 'rating' : 'ratings');

pluralFormatRatings()