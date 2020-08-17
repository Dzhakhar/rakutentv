import {IAction, ActionTypes} from "../actionTypes";
import {IContentExtended} from "../../../model/movie_list/IContentExtended";

export function loadTrailerAction(payload: IContentExtended): IAction {
    return {
        type: ActionTypes.RUN_TRAILER,
        payload
    }
}