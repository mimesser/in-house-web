import IAggregate from 'interfaces/IAggregate';
import dispatch from 'store/dispatch';
import ActionType from './action-type';
import IAction from './IAction';

export const setAggregate = (aggregate: IAggregate) => dispatch({ type: ActionType.SET, aggregate } as IAction);
