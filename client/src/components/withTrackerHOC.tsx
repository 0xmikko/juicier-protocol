/*
 * Stackdrive. Self-order apps for business
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React, {useEffect} from "react";
import ReactGA, {FieldsObject} from "react-ga";
import {RouteComponentProps, useHistory} from "react-router-dom";
import ReactPixel from "react-facebook-pixel";
import {isDev} from "../config";
import {Analytics} from "rc-analytics";


let previousUrl = "";

export const withTracker = <P extends RouteComponentProps>(
    WrappedComponent: React.ComponentType<P>,
    options: FieldsObject = {},
) => {

    if (isDev) return WrappedComponent;

    const trackPageGA = (page: string) => {
        ReactGA.set({ page, ...options });
        ReactGA.pageview(page);
    };

    return (props: P) => {

        const history = useHistory()

        useEffect(() => {
            if (props.location.pathname !== previousUrl) {
                previousUrl = props.location.pathname;
                trackPageGA(props.location.pathname);
                ReactPixel.pageView();
                Analytics.sendEvent("PAGE_OPEN", "CLIENT:" + props.location.pathname)
            }
        }, [history]);

        return <WrappedComponent {...props} />;
    };
};
