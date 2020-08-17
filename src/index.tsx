import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import "./ui/styles/main.css";
import {movieListRequest} from "./logic/redux/effects/movieListRequest";
import {ListNames} from "./logic/redux/utilities/util";
import {actions, store} from "./logic/redux";
import {IMovieList} from "./logic/model/movie_list/IMovieList";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Homepage} from "./ui/homepage/Homepage";
import {MoviePage} from "./ui/movie_page/MoviePage";
import {
    IViewportParams,
    ViewportContextConsumer,
    ViewportContextProvider
} from "./ui/viewport_provider/ViewportProvider";
import {Navbar} from "./ui/navbar/Navbar";
import {Greeting} from "./ui/greeting/Greeting";
import "whatwg-fetch";
import {useEffect, useState} from "react";
import {IAppState} from "./logic/redux/stores/IAppState";
import {VideoPlayer} from "./ui/video_player/VideoPlayer";

const AppRoot = () => {
    const state: IAppState = store.getState();

    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    useEffect(() => {
        // if there's a video to play
        if (state && state.trailer && state.trailer.id) {
            setIsVideoPlaying(true);
            document.body.style.overflow = "hidden";
        } else {
            setIsVideoPlaying(false);
            document.body.style.overflow = "auto";
        }
    }, [state.trailer && state.trailer.id]);

    return (
        <Provider store={store}>
            <Router>
                <ViewportContextProvider>
                    <ViewportContextConsumer>
                        {(viewportParams: IViewportParams) => {
                            return (
                                <>

                                    {(true || viewportParams.container.width > 1199) && (
                                        <Greeting/>
                                    )}

                                    {isVideoPlaying && <VideoPlayer/>}

                                    <div className={`app ${isVideoPlaying && "app--fade-out"}`}>
                                        <Navbar/>
                                        <div className={"container"} style={{
                                            width: `${viewportParams.container.width}px`
                                        }}>
                                            <Route path={"/"} component={Homepage} exact={true}/>
                                            <Route path={"/movie/:movieId"} component={MoviePage}/>
                                        </div>
                                    </div>
                                </>
                            );
                        }}
                    </ViewportContextConsumer>
                </ViewportContextProvider>
            </Router>
        </Provider>
    );
};

function runApp() {
    ReactDOM.render(<AppRoot/>, document.getElementById("app-root"));
}

store.subscribe(runApp);

Promise.all([
    // by default we only fetch POPULARS and Premiers
    // other lists will be fetched once they appear in viewport
    // I consider this Promise.all as the initiator of the app
    // and here we can add more async effects in the future
    movieListRequest(ListNames.POPULARS),
    movieListRequest(ListNames.POPULAR_PREMIERS),
    // movieListRequest(ListNames.FAMILY_PREMIERS)
])
    .then((payloads: IMovieList[]) => {
        actions.fetchList(payloads[0]);
        actions.fetchList(payloads[1]);
    });