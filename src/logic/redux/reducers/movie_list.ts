import {IAppState} from "../stores/IAppState";
import {ActionTypes, IAction} from "../actions/actionTypes";
import {IMovieList} from "../../model/movie_list/IMovieList";
import {IContentExtended} from "../../model/movie_list/IContentExtended";
import {ITrailer} from "../../model/trailer/ITrailer";

export function movieListReducer(state: IAppState, action: IAction): any {
    switch (action.type) {
        case ActionTypes.FETCH_LIST:
            return {
                ...state,
                data: [
                    ...state.data,
                    (action.payload as IMovieList)
                ]
            };

        case ActionTypes.LIST_APPEARED_IN_VIEWPORT:
            return {...state};

        case ActionTypes.FETCH_TRAILER:
            return {
                ...state,
                trailer: (action.payload as ITrailer)
            };

        case ActionTypes.FETCH_CONTENTS:
            return {
                ...state,
                data: state.data.map((m: IMovieList) => {
                    if (m.id === (action.payload as IMovieList).id) {

                        return {
                            ...action.payload
                        }
                    }

                    return m;
                })
            };

        case ActionTypes.CHANGE_PAGE:
            return {
                ...state,
                data: state.data.map((m: IMovieList) => {
                    if (m.id === (action.payload as IMovieList).id) {
                        return {
                            ...m,
                            contents: {
                                ...m.contents,
                                meta: {
                                    ...m.contents.meta,
                                    pagination: {
                                        ...m.contents.meta.pagination,
                                        page: m.contents.meta.pagination.page + 1
                                    }
                                }
                            }
                        }
                    }

                    return m;
                })
            };

        case ActionTypes.FETCH_MOVIE:
            return {
                ...state,
                activeMovie: (action.payload as IContentExtended)
            };

        case ActionTypes.HOMEPAGE_OPENED:
            return {
                ...state,
                activeMovie: undefined,
                trailer: undefined
            };

        case ActionTypes.LEAVE_TRAILER:
            return {
                ...state,
                trailer: undefined
            };

        default:
            return state;
    }
}