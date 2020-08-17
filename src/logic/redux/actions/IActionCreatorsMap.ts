import {ActionCreatorsMapObject, ActionCreator} from "redux";
import {IAction} from "./actionTypes";

export interface IActionCreatorsMap extends ActionCreatorsMapObject<IAction> {
    fetchList: ActionCreator<IAction>;
    nextPage: ActionCreator<IAction>;
    listAppearedInViewport: ActionCreator<IAction>;
    moviePageOpened: ActionCreator<IAction>;
    homepageOpened: ActionCreator<IAction>;
    loadTrailer: ActionCreator<IAction>;
    leaveTrailer: ActionCreator<IAction>;
}
