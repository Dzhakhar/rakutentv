import * as React from "react";
import {Link} from "react-router-dom";
import {RakutenLogo} from "./rakuten_logo";
import "./navbar.css";
import {ReactReduxContext, ReactReduxContextValue} from "react-redux";
import {IAppState} from "../../logic/redux/stores/IAppState";
import {IViewportParams, ViewportContextConsumer} from "../viewport_provider/ViewportProvider";

export const Navbar = () => {
    return (
        <ViewportContextConsumer>
            {(viewportParams: IViewportParams) => {
                return (
                    <ReactReduxContext.Consumer>
                        {({store}: ReactReduxContextValue<IAppState>) => {
                            const state: IAppState = store.getState();
                            const isTitleShown: boolean = (state && !!state.activeMovie);

                            return (
                                <div className={"navbar"}>
                                    <div className={`navbar__container ${isTitleShown && "navbar--three-column"}`}
                                         style={{width: `${viewportParams.container.width}px`}}>

                                        <Link to={"/"}>
                                            <RakutenLogo/>
                                        </Link>

                                        {(isTitleShown) && (
                                            <>
                                                <div className={"navbar__center navbar__title"}>
                                                    {state.activeMovie.title && state.activeMovie.title.toUpperCase()}
                                                </div>
                                                <div className={"navbar__right"}></div>
                                            </>
                                        )}

                                    </div>
                                </div>
                            );
                        }}
                    </ReactReduxContext.Consumer>
                );
            }}
        </ViewportContextConsumer>
    )
};
