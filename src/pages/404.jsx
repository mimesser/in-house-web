import Error from 'next/error';

export default function NotFound() {
  // Opinionated: do not record an exception in Sentry for 404
  // TODO: Redsign this
  return <Error statusCode={404} />;
}
