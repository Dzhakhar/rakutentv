import * as React from "react";
import {RakutenLogo} from "../navbar/rakuten_logo";

interface IRakutenPresentsProps {
    toFadeOut: boolean;
}

export const RakutenPresents = (props:IRakutenPresentsProps) => {
    return (
        <div className={`rakuten-presents ${props.toFadeOut && "rakuten-presents--fade-out"}`}>
            <div className="rakuten-presents__logo">
                <RakutenLogo/>
            </div>
            <div className={"rakuten-presents__msg"}>
                PRESENTS
            </div>
        </div>
    );
};