import * as React from "react";
import {IViewportParams, ViewportContextConsumer} from "../viewport_provider/ViewportProvider";
import {useEffect, useRef, useState} from "react";
import {actions} from "../../logic/redux";
import {ListNames} from "../../logic/redux/utilities/util";

interface IMovieListStubProps {
    listName: ListNames;
}

interface IStubProps extends IMovieListStubProps {
    viewportParams: IViewportParams;
}

const Stub = (props: IStubProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [isActionCalled, setIsActionCalled] = useState(false);

    useEffect(() => {
        if (!isActionCalled) {
            const inViewport: boolean = props.viewportParams.isElementInViewport(rootRef.current);

            if (inViewport) {
                actions.listAppearedInViewport(props.listName);
                setIsActionCalled(true);
            }
        }
    }, [props.viewportParams.offsets.y]);

    return (
        <div ref={rootRef} className={"list-stub"}></div>
    );
};

const MovieListStubWrapper = (props: IMovieListStubProps) => {
    return (
        <ViewportContextConsumer>
            {(viewportParams: IViewportParams) => (<Stub listName={props.listName} viewportParams={viewportParams}/>)}
        </ViewportContextConsumer>
    );
};

export {MovieListStubWrapper as MovieListStub};