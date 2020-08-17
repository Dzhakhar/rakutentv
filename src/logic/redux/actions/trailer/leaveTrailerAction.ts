import {IAction, ActionTypes} from "../actionTypes";

export function leaveTrailerAction(): IAction {
    return {
        type: ActionTypes.LEAVE_TRAILER,
        payload: {}
    }
}