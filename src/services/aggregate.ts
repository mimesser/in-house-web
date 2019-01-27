import api from 'api';
import IAggregate from 'interfaces/IAggregate';

export async function getAggregate (timestamp?: number): Promise<IAggregate> {
   const { data } = await api.get('/aggregate', { params: { timestamp } });
   return data;
}
