import * as React from "react";
import {ReactReduxContext, ReactReduxContextValue} from "react-redux";
import {IAppState} from "../../logic/redux/stores/IAppState";
import {IMovieList} from "../../logic/model/movie_list/IMovieList";
import {ListNames} from "../../logic/redux/utilities/util";
import {MovieList} from "../movie_list/MovieList";
import {useEffect} from "react";
import {actions} from "../../logic/redux";

export const Homepage = () => {
    useEffect(() => {
        actions.homepageOpened();
    }, []);

    return (
        <ReactReduxContext.Consumer>
            {({store}: ReactReduxContextValue<IAppState>) => {
                const state: IAppState = store.getState();

                return (
                    <>
                        {
                            state && state.data && (
                                <>
                                    <MovieList
                                        listName={ListNames.POPULARS}
                                        movieList={state.data.filter((m: IMovieList) => m.id === ListNames.POPULARS)[0]}/>
                                    <MovieList
                                        listName={ListNames.POPULAR_PREMIERS}
                                        movieList={state.data.filter((m: IMovieList) => m.id === ListNames.POPULAR_PREMIERS)[0]}/>
                                    <MovieList
                                        listName={ListNames.FAMILY_PREMIERS}
                                        movieList={state.data.filter((m: IMovieList) => m.id === ListNames.FAMILY_PREMIERS)[0]}/>
                                    <MovieList
                                        listName={ListNames.IF_YOU_LOST}
                                        movieList={state.data.filter((m: IMovieList) => m.id === ListNames.IF_YOU_LOST)[0]}/>
                                    <MovieList
                                        listName={ListNames.SPAIN_PREMIERS}
                                        movieList={state.data.filter((m: IMovieList) => m.id === ListNames.SPAIN_PREMIERS)[0]}/>
                                    <MovieList
                                        listName={ListNames.FAVOURITES_OF_WEEK}
                                        movieList={state.data.filter((m: IMovieList) => m.id === ListNames.FAVOURITES_OF_WEEK)[0]}/>
                                    {/* Rakuten API cannot find `especial-x-men` :(    */}
                                    {/* so I have to disable it    */}
                                    {/*<MovieList listName={ListNames.SPECIAL_X_MEN} movieList={state.data.filter((m: IMovieList) => m.id === ListNames.SPECIAL_X_MEN)[0]}/>*/}
                                </>
                            )
                        }
                    </>
                );
            }}
        </ReactReduxContext.Consumer>
    );
};
