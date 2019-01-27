import IIndustry from './IIndustry';
import IUser from './IUser';

export default interface IAggregate {
   readonly timestamp: number;
   readonly user: IUser;
   readonly industries: IIndustry[];
   readonly readonly?: number;
}
