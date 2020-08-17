import {createStore, bindActionCreators, Store, compose, applyMiddleware} from "redux";
import {movieListReducer} from "./reducers/movie_list";
import {fetchListAction} from "./actions/movie_list/fetchListAction";
import {IAppState} from "./stores/IAppState";
import {IAction} from "./actions/actionTypes";
import {IActionCreatorsMap} from "./actions/IActionCreatorsMap";
import {changePageAction} from "./actions/movie_list/changePageAction";
import createSagaMiddleware from "redux-saga";
import {onPageChangeSaga} from "./sagas/onPageChangeSaga";
import {appearedInViewportAction} from "./actions/movie_list/appearedInViewportAction";
import {onListAppearedInViewportSaga} from "./sagas/onListAppearedInViewportSaga";
import {onMoviePageOpenedSaga} from "./sagas/onMoviePageOpenedSaga";
import {moviePageOpenedAction} from "./actions/movie_page/moviePageOpenedAction";
import {homepageOpenedAction} from "./actions/movie_list/homepageOpenedAction";
import {loadTrailerAction} from "./actions/trailer/loadTrailerAction";
import {onTrailerPlayedSaga} from "./sagas/onTrailerPlayedSaga";
import {leaveTrailerAction} from "./actions/trailer/leaveTrailerAction";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store: Store<IAppState> = createStore<IAppState, IAction, any, any>(movieListReducer, {
    data: [],
    activeMovie: undefined,
    trailer: undefined
}, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(onPageChangeSaga);
sagaMiddleware.run(onListAppearedInViewportSaga);
sagaMiddleware.run(onMoviePageOpenedSaga);
sagaMiddleware.run(onTrailerPlayedSaga);

export const actions = bindActionCreators<IAction, IActionCreatorsMap>({
    fetchList: fetchListAction,
    nextPage: changePageAction,
    listAppearedInViewport: appearedInViewportAction,
    moviePageOpened: moviePageOpenedAction,
    homepageOpened: homepageOpenedAction,
    loadTrailer: loadTrailerAction,
    leaveTrailer: leaveTrailerAction
}, store.dispatch);
