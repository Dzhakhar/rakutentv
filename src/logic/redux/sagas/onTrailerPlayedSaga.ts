import {call, put, takeLatest} from "redux-saga/effects";
import {ActionTypes, IAction} from "../actions/actionTypes";
import {trailerRequest} from "../effects/trailerRequest";
import {ITrailer} from "../../model/trailer/ITrailer";

function* fetchTrailer(action: IAction) {
    const trailer: ITrailer = yield call(trailerRequest, (action.payload as ITrailer).id);

    yield put({
        type: ActionTypes.FETCH_TRAILER,
        payload: trailer
    });
}

export function* onTrailerPlayedSaga() {
    yield takeLatest(ActionTypes.RUN_TRAILER, fetchTrailer);
}