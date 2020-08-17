import {IAction, ActionTypes} from "../actionTypes";
import {ListNames} from "../../utilities/util";

export function appearedInViewportAction(payload: ListNames): IAction {
    return {
        type: ActionTypes.LIST_APPEARED_IN_VIEWPORT,
        payload: {
            id: payload
        }
    }
}