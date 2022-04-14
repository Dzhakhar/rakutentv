import * as React from "react";
import {IMovieList} from "../../logic/model/movie_list/IMovieList";
import {IContent} from "../../logic/model/movie_list/IContent";
import {Link} from "react-router-dom";
import {IViewportParams, ViewportContextConsumer} from "../viewport_provider/ViewportProvider";
import {useEffect, useState, useRef} from "react";
import {ARTWORK_RATIO, calcArtworksCountWithinContainer, getArtworkWidth} from "./movieListUtils";
import {calculateContainerWidth} from "../viewport_provider/calculateContainerWidth";
import "./movie_list.css";
import {actions} from "../../logic/redux";
import {MovieListStub} from "./MovieListStub";
import {ListNames} from "../../logic/redux/utilities/util";

interface IMovieListProps {
    movieList: IMovieList;
    listName: ListNames;
}

interface IPeriod {
    from: number;
    to: number;
}

interface IMovieListState {
    currentPeriod: IPeriod;
    nextPeriod?: IPeriod;

    loadedArtworks: { [key: number]: boolean };
}

interface IArtworkLoadPromiseResult {
    id: number;
    isSucceeded: boolean;
}

const placeholderImgUrl: string = "https://prod3-kraken-cloudfront.rakuten.tv/images/placeholders/covers/negative-portrait-7ab75372ad.png";

export const MovieList = (props: IMovieListProps) => {
    const {movieList} = props;
    const isDataNotReady: boolean = !movieList || !movieList.contents || !movieList.contents.data || movieList.contents.data.length < 1;

    if (isDataNotReady) return (<MovieListStub listName={props.listName}/>);

    const rootRef = useRef<HTMLDivElement>(null);
    const movies: IContent[] = movieList.contents.data;

    const [listState, setListState] = useState<IMovieListState>({
        currentPeriod: {
            from: 0,
            to: calcArtworksCountWithinContainer(calculateContainerWidth(window.innerWidth))
        },
        loadedArtworks: {}
    });

    useEffect(() => {
        if (listState.nextPeriod && listState.nextPeriod.to >= movies.length) {
            if (movieList.contents.meta && movieList.contents.meta.pagination
                && movieList.contents.meta.pagination.total_pages > movieList.contents.meta.pagination.page) {

                actions.nextPage(movieList);

            }
        }
    }, [listState.nextPeriod]);

    useEffect(() => {
        const periodToLoad: IPeriod = listState.nextPeriod ? listState.nextPeriod : listState.currentPeriod;

        Promise.all(
            movies.slice(periodToLoad.from, periodToLoad.to)
                .map((movie: IContent) => {

                    return new Promise<IArtworkLoadPromiseResult>((resolve) => {
                        if (movie.images && movie.images.artwork && !listState.loadedArtworks[movie.numerical_id]) {
                            const img = new Image();
                            let attemptsCount: number = 0;

                            img.onload = function () {
                                return resolve({
                                    id: movie.numerical_id,
                                    isSucceeded: true
                                })
                            };

                            img.onerror = function () {
                                if (attemptsCount < 3) {
                                    attemptsCount++;
                                    img.src = movie.images.artwork;
                                } else {
                                    return resolve({
                                        id: movie.numerical_id,
                                        isSucceeded: false
                                    })
                                }
                            };

                            img.src = movie.images.artwork;
                        }
                    });

                })
        ).then((results: IArtworkLoadPromiseResult[]) => {
            const loadedArtworks = {...listState.loadedArtworks};

            results.forEach((result: IArtworkLoadPromiseResult) => loadedArtworks[result.id] = result.isSucceeded);

            setListState({
                ...listState,
                loadedArtworks
            })
        })
    }, [listState.nextPeriod, listState.currentPeriod.to]);

    useEffect(() => {
        if (listState.nextPeriod) {
            // we need the timeout cause we need to wait until the previous period is disappeared
            const timeout: any = setTimeout(() => {
                setListState({
                    ...listState,
                    currentPeriod: listState.nextPeriod,
                    nextPeriod: undefined
                });

                clearTimeout(timeout);
            }, 700);
        }
    }, [listState.nextPeriod]);

    return (
        <ViewportContextConsumer>
            {(viewportParams: IViewportParams) => {
                const artworksCount: number = calcArtworksCountWithinContainer(viewportParams.container.width);

                if (artworksCount !== (listState.currentPeriod.to - listState.currentPeriod.from)) {
                    setListState({
                        ...listState,
                        currentPeriod: {
                            from: listState.currentPeriod.from,
                            to: listState.currentPeriod.from + artworksCount
                        }
                    })
                }

                return (
                    <div className={"list"} ref={rootRef}>
                        <>
                            <div className={"list__title"}>
                                {movieList.name}
                            </div>

                            <div className={"movies"} style={{
                                opacity: listState.nextPeriod ? 0 : 1
                            }}>

                                {(listState.currentPeriod.from - artworksCount >= 0) && (
                                    <div className={"movies__btn movies__btn--prev"} onClick={() => {
                                        setListState({
                                            ...listState,
                                            nextPeriod: {
                                                from: listState.currentPeriod.from - artworksCount,
                                                to: listState.currentPeriod.to - artworksCount
                                            }
                                        })
                                    }}>
                                        <i className="fas fa-angle-left"></i>
                                    </div>
                                )}

                                {((listState.currentPeriod.from + artworksCount <= movieList.contents.data.length)
                                    && listState.currentPeriod.to < movieList.contents.meta.pagination.count) && (
                                    <div className={"movies__btn movies__btn--next"} onClick={() => {
                                        setListState({
                                            ...listState,
                                            nextPeriod: {
                                                from: listState.currentPeriod.from + artworksCount,
                                                to: listState.currentPeriod.to + artworksCount
                                            }
                                        })
                                    }}>
                                        <i className="fas fa-angle-right"></i>
                                    </div>
                                )}

                                {movies.slice(listState.currentPeriod.from, listState.currentPeriod.to)
                                    .map((movie: IContent) => {
                                        const artworkWidth: number = getArtworkWidth(viewportParams.container.width);

                                        return (
                                            <Link title={movie.title} className={"movie"}
                                                  to={`/movie/${movie.id}`} style={{
                                                backgroundImage: `url(${listState.loadedArtworks[movie.numerical_id] ? movie.images.artwork : placeholderImgUrl})`,
                                                minWidth: `${artworkWidth}px`,
                                                height: `${artworkWidth * ARTWORK_RATIO}px`
                                            }}>
                                            </Link>
                                        );
                                    })}
                            </div>
                        </>
                    </div>
                );
            }}
        </ViewportContextConsumer>
    );
};
