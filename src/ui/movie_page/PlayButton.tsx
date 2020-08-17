import * as React from "react";
import {HTMLAttributes} from "react";

interface IPlayButtonProps extends HTMLAttributes<HTMLElement> {
}

export const PlayButton = (props: IPlayButtonProps) => {
    return (
        <div className={"play-button"}>
            <button onClick={props.onClick ? props.onClick : () => 1}>
                <i className={"fas fa-play"}></i>
            </button>
        </div>
    );
};