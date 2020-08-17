import * as React from "react";
import {BrowserRouterProps, match} from "react-router-dom";
import {useEffect} from "react";
import {ReactReduxContext, ReactReduxContextValue} from "react-redux";
import {IAppState} from "../../logic/redux/stores/IAppState";
import {actions} from "../../logic/redux";
import {IContentExtended} from "../../logic/model/movie_list/IContentExtended";
import "./movie_page.css";
import {PlayButton} from "./PlayButton";

interface IMoviePageParams {
    movieId: string;
}

interface IMoviePageProps extends BrowserRouterProps {
    match: match<IMoviePageParams>;
}

export const MoviePage = (props: IMoviePageProps) => {
    useEffect(() => {
        actions.moviePageOpened({
            id: props.match.params.movieId
        })
    }, []);

    return (
        <ReactReduxContext.Consumer>
            {({store}: ReactReduxContextValue<IAppState>) => {
                const state: IAppState = store.getState();
                const movie: IContentExtended = state.activeMovie;

                if (!movie) {
                    return null;
                }

                return (
                    <div className={"content-page"}>
                        <div className="content-page__image" style={{
                            backgroundImage: `url(${movie.images.snapshot})`
                        }}>
                            <div className="content-page__cover"></div>
                            <PlayButton onClick={() => actions.loadTrailer({id: movie.id})}/>
                        </div>
                        {movie.plot && (
                            <div className={"content-page__plot"}>
                                {movie.plot}
                            </div>
                        )}
                    </div>
                );
            }}
        </ReactReduxContext.Consumer>
    )
};
