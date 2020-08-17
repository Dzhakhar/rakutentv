import {Action} from "redux";
import {IMovieList} from "../../model/movie_list/IMovieList";
import {ListNames} from "../utilities/util";
import {IContentExtended} from "../../model/movie_list/IContentExtended";
import {ITrailer} from "../../model/trailer/ITrailer";

export const enum ActionTypes {
    FETCH_LIST = "FETCH_LIST",
    FETCH_CONTENTS = "FETCH_CONTENTS",
    FETCH_MOVIE = "FETCH_MOVIE",
    FETCH_TRAILER = "FETCH_TRAILER",
    RUN_TRAILER = "RUN_TRAILER",
    CHANGE_PAGE = "CHANGE_PAGE",
    LIST_APPEARED_IN_VIEWPORT = "LIST_APPEARED_IN_VIEWPORT",
    MOVIE_PAGE_OPENED = "MOVIE_PAGE_OPENED",
    HOMEPAGE_OPENED = "HOMEPAGE_OPENED",
    LEAVE_TRAILER = "LEAVE_TRAILER"
}

export interface IAction extends Action<ActionTypes> {
    payload: IMovieList | IContentExtended | ITrailer;
}