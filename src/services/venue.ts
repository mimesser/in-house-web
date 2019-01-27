import api from 'api';
import IVenue from 'interfaces/IVenue';

interface ISearchOptions {
   orderBy?: number;
   sortDirecation?: number;
   skip?: number;
   take?: number;
}

export async function getTopMink (venueId: number): Promise<any> {
   const { data } = await api.get(`/venues/${venueId}/topmink`);
   return data;
}

export async function answerMink (venueId: number, minkId: number, answer: string): Promise<any> {
   const { data } = await api.post(`/venues/${venueId}/mink/${minkId}/answer`, { answer });
   return data;
}

export async function getMinks (venueId: number, searchOptions?: ISearchOptions): Promise<any> {
   const { data } = await api.get(`/venues/${venueId}/minks`, { params: searchOptions });
   return data;
}

export async function rateMink (venueId: number, minkId: number, vote: number): Promise<any> {
   const { data } = await api.post(`/venues/${venueId}/mink/${minkId}/rate`, { vote });
   return data;
}

export async function getVenues (industryId?: number): Promise<IVenue[]> {
   const { data } = await api.get('/venues', { params: { industryId } });
   return data;
}
