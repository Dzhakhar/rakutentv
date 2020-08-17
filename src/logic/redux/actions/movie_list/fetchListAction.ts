import {IAction, ActionTypes} from "../actionTypes";
import {IMovieList} from "../../../model/movie_list/IMovieList";

export function fetchListAction(payload:IMovieList): IAction {
    return {
        type: ActionTypes.FETCH_LIST,
        payload
    }
}