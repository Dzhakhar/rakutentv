import {call, put, takeLatest, select} from "redux-saga/effects";
import {ActionTypes, IAction} from "../actions/actionTypes";
import {contentsRequest} from "../effects/contentsRequest";
import {IMovieList} from "../../model/movie_list/IMovieList";
import {IContents} from "../../model/movie_list/IContents";
import {IAppState} from "../stores/IAppState";

const getAppState = (state: IAppState) => state;

function* fetchNextPage(action: IAction) {
    const appState: IAppState = yield select(getAppState);
    const movieList: IMovieList = (action.payload as IMovieList);

    let page: number = 1;
    appState.data.filter((m: IMovieList) => m.id === (action.payload as IMovieList).id)
        .forEach((m: IMovieList) => {
            page = m.contents.meta.pagination.page;
        });

    const contents: IContents = yield call(contentsRequest, movieList.id, page);

    yield put({
        type: ActionTypes.FETCH_CONTENTS,
        payload: {
            ...movieList,
            contents: {
                data: [
                    ...movieList.contents.data,
                    ...contents.data
                ],
                meta: contents.meta
            }
        }
    })
}

export function* onPageChangeSaga() {
    yield takeLatest(ActionTypes.CHANGE_PAGE, fetchNextPage);
}