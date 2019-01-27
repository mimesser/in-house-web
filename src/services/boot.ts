import { setToken } from 'auth';
import { setAggregate } from 'store/aggregate/actions';
import { getAggregate } from './aggregate';

export default async function boot () {
   try {
      const aggregate = await getAggregate();
      setAggregate(aggregate);
      setToken(aggregate.user.id);
   } catch (err) {
      console.log(err);
   }
}
