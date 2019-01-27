import ActionType from './action-type';

export default interface IAction {
   type: ActionType;
   [prop: string]: any;
}
