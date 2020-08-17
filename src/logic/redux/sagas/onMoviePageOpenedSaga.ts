import {call, put, takeLatest} from "redux-saga/effects";
import {ActionTypes, IAction} from "../actions/actionTypes";
import {singleMovieRequest} from "../effects/movieRequest";
import {IContentExtended} from "../../model/movie_list/IContentExtended";

function* fetchSingleMovie(action: IAction) {
    const movie: IContentExtended = yield call(singleMovieRequest, (action.payload as IContentExtended).id);

    yield put({
        type: ActionTypes.FETCH_MOVIE,
        payload: movie
    });
}

export function* onMoviePageOpenedSaga() {
    yield takeLatest(ActionTypes.MOVIE_PAGE_OPENED, fetchSingleMovie);
}