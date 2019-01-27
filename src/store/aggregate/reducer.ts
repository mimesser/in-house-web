import IAggregate from 'interfaces/IAggregate';
import IAction from 'store/aggregate/IAction';
import types from './action-type';

const initialState = {} as IAggregate;

export default function aggregate (state: IAggregate = initialState, action: IAction): IAggregate {
   if (action.type === types.SET) {
      return action.aggregate;
   }
   return state;
}
