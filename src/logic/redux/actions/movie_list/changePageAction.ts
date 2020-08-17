import {IAction, ActionTypes} from "../actionTypes";
import {IMovieList} from "../../../model/movie_list/IMovieList";

export function changePageAction(payload:IMovieList): IAction {
    return {
        type: ActionTypes.CHANGE_PAGE,
        payload
    }
}