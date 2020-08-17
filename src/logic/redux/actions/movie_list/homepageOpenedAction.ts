import {IAction, ActionTypes} from "../actionTypes";
import {IContentExtended} from "../../../model/movie_list/IContentExtended";

export function homepageOpenedAction(payload: IContentExtended): IAction {
    return {
        type: ActionTypes.HOMEPAGE_OPENED,
        payload
    }
}