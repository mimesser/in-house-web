import { call, put } from 'redux-saga/effects';
import Router from 'next/router';

import api from '../../../api';

import { reloadInsiderVenueIds } from './reloadInsiderVenueIds';
import { reloadVenues } from './initVenuesPage';
import { setLoading } from '../actions';

/**
 * @description
 * This Redux Saga function helps to create new venue.
 * @param {string} name  is the name of the Venue.
 * @param {string} industry  is the industry of the new venue.
 * @param {string} industryDesc  is the industry Description of the new venue.
 * @param {string} country  is the country of the new venue.
 * @param {string} city  is the city of the new venue.
 * @param {string} address  is the address of the new venue.
 * @param {string} zip  is the zip code of the new venue.
 * @param {string} question  is the question  of the new venue.
 * @param {string} answer  is the answer  of the new venue.
 * @param {file} image  is the image file  of new venue.
 *
 * @returns Nothing
 */

export function* createVenue({
  payload: {
    venue: {
      name,
      industry,
      industryDesc: industryDescription,
      country,
      city,
      address,
      zip: zipCode,
      question: minkQuestion,
      answer: minkAnswer,
      image,
    },
  },
}) {
  try {
    yield put(setLoading(true));

    let imageUrl;
    if (image) {
      const formData = new FormData();
      formData.append('file', image, Date.now() + name);
      const { data: response } = yield call(api.post, `/venues/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      imageUrl = response.url;
    }

    const { data: created } = yield call(api.post, `/venues`, {
      name,
      industryId: industry.id,
      venueInfo: {
        zipCode,
        address,
        city,
        country,
        imageUrl,
      },
      minkAnswer,
      minkQuestion,
      industryDescription,
    });

    yield reloadInsiderVenueIds();
    yield reloadVenues();

    const { id } = created;
    Router.push(`/houses?id=${id}`, `/houses/${id}`, { shallow: true });
  } finally {
    yield put(setLoading(false));
  }
}
