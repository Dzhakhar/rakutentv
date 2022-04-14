import * as React from "react";
import {ReactReduxContext, ReactReduxContextValue} from "react-redux";
import {IAppState} from "../../logic/redux/stores/IAppState";
import "./video_player.css";
import {RakutenPresents} from "./RakutenPresents";
import {IStreamInfo} from "../../logic/model/trailer/IStreamInfo";
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {actions} from "../../logic/redux";

export const VideoPlayer = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoShown, setIsVideoShown] = useState(false);

    useEffect(() => {
        if (videoRef.current.play) {
            videoRef.current.play()
                .then(() => {
                    const timeout: any = setTimeout(() => {
                        setIsVideoShown(true);
                        clearTimeout(timeout);
                    }, 2000);
                })
        } else {
            // if it is an old browser, then we don't apply any beautiful effects :(
            setIsVideoShown(true);
        }
    }, []);

    return (
        <ReactReduxContext.Consumer>
            {({store}: ReactReduxContextValue<IAppState>) => {
                const state: IAppState = store.getState();

                if (!state.trailer || !state.trailer.stream_infos || state.trailer.stream_infos.length < 1) {
                    return null;
                }

                const streamInfos: IStreamInfo[] = state.trailer.stream_infos;

                return (
                    <div className={"vp"}>
                        <RakutenPresents toFadeOut={isVideoShown}/>

                        {isVideoShown && (
                            <div onClick={() => actions.leaveTrailer()} className={"vp__go-back-button"}>
                                <i className={"fas fa-angle-left"}></i>
                                GO BACK
                            </div>
                        )}

                        <video ref={videoRef} controls={true} style={{
                            display: isVideoShown ? "block" : "none",
                            width: "80%"
                        }}>
                            {streamInfos.map((streamInfo: IStreamInfo) => (
                                <source src={streamInfo.url}></source>
                            ))}
                        </video>
                    </div>
                );
            }}
        </ReactReduxContext.Consumer>
    );
};
