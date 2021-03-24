import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import {useMemo, useState} from "react";
import { cleanObject, subset} from "./index";

/**
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams] = useSearchParams();
    const setSearchParams = useSetUrlSearchParam();
    const [stateKeys] = useState(keys);
    return [
        useMemo(
            () =>
                subset(Object.fromEntries(searchParams), keys) as {
                    [key in K]: string;
                },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [searchParams, stateKeys]
        ),
        (params: Partial<{ [key in K]: unknown }>) => {
           return setSearchParams(params)
        },
    ]as const;
};

export const  useSetUrlSearchParam = () => {
    const [searchParams, setSearchParam] = useSearchParams();
    return (params: Partial<{ [key in string]: unknown }>) => {
        // iterator
        // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
        const o = cleanObject({
            ...Object.fromEntries(searchParams),
            ...params,
        }) as URLSearchParamsInit;
        return setSearchParam(o);
    }
}

