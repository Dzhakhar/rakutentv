import {IAction, ActionTypes} from "../actionTypes";
import {IContentExtended} from "../../../model/movie_list/IContentExtended";

export function moviePageOpenedAction(payload: IContentExtended): IAction {
    return {
        type: ActionTypes.MOVIE_PAGE_OPENED,
        payload
    }
}