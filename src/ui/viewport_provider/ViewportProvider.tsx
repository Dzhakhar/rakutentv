import * as React from "react";
import {useEffect, useState} from "react";
import {calculateContainerWidth} from "./calculateContainerWidth";

interface IViewportProviderProps {
    children: any;
}

interface IContainer {
    width: number;
    height: number;
}

export interface IViewportParams {
    container: IContainer;
    offsets: {
        y: number;
        x: number;
    },
    isElementInViewport: (el: HTMLElement) => boolean;
}

function isElementInViewport(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    const verticallyInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horizontallyInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (verticallyInView && horizontallyInView);
}

const {Provider, Consumer} = React.createContext({});

const ViewportContextProvider = (props: IViewportProviderProps) => {
    const [viewportParams, setViewportParams] = useState<IViewportParams>({
        container: {
            width: calculateContainerWidth(window.innerWidth),
            height: window.innerHeight
        },
        offsets: {
            y: window.pageYOffset,
            x: window.pageXOffset,
        },
        isElementInViewport: isElementInViewport
    });

    useEffect(() => {
        window.addEventListener("resize", (e: UIEvent) => {
            setViewportParams({
                ...viewportParams,
                container: {
                    width: calculateContainerWidth(window.innerWidth),
                    height: window.innerHeight
                }
            })
        });


        window.addEventListener("scroll", () => {
            setViewportParams({
                ...viewportParams,
                offsets: {
                    y: window.pageYOffset,
                    x: window.pageXOffset
                }
            })
        })
    }, []);

    return (
        <Provider value={viewportParams}>
            {props.children}
        </Provider>
    );
};

export {ViewportContextProvider, Consumer as ViewportContextConsumer};