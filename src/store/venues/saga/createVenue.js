import { call, put } from 'redux-saga/effects';
import Router from 'next/router';

import api from '../../../api';

import { reloadInsiderVenueIds } from './reloadInsiderVenueIds';
import { reloadVenues } from './initVenuesPage';
import { setLoading } from '../actions';

export function* createVenue({
  payload: {
    venue: {
      name,
      industry,
      industryDesc,
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

    // TODO: industryDesc

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
      industryDesc,
    });

    yield reloadInsiderVenueIds();
    yield reloadVenues();

    const { id } = created;
    Router.push(`/houses?id=${id}`, `/houses/${id}`, { shallow: true });
  } finally {
    yield put(setLoading(false));
  }
}
