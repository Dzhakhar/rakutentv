import {call, put, takeEvery} from "redux-saga/effects";
import {ActionTypes, IAction} from "../actions/actionTypes";
import {IMovieList} from "../../model/movie_list/IMovieList";
import {movieListRequest} from "../effects/movieListRequest";

function* fetchAppearedList(action: IAction) {
    const movieList: IMovieList = yield call(movieListRequest, (action.payload as IMovieList).id);

    yield put({
        type: ActionTypes.FETCH_LIST,
        payload: movieList
    });
}

export function* onListAppearedInViewportSaga() {
    yield takeEvery(ActionTypes.LIST_APPEARED_IN_VIEWPORT, fetchAppearedList);
}