import React from 'react';

interface Props {
    color: string;
    bgColor: string;
    text: string;
    borderRadius: string;
    size?: string;
    type?: "button" | "submit" | "reset" | undefined;
    paddingRight?: number;
    paddingLeft?: number;
    paddingTop?: number;
    paddingBottom?: number;
    onClickFunction?: any;
}

export const Button = ({
                           color,
                           bgColor,
                           text,
                           borderRadius,
                           size,
                           type,
                           paddingRight,
                           paddingLeft,
                           paddingTop,
                           paddingBottom,
                           onClickFunction,
                       }: Props) => {
    return (
        <button
            type={type}
            style={{
                backgroundColor: bgColor,
                color,
                borderRadius
            }}
            className={`text-${size} pr-${paddingRight} pl-${paddingLeft} pt-${paddingTop} pb-${paddingBottom} hover:drop-shadow-xl`}
            onClick={onClickFunction}
        >
            {text}
        </button>
    )
}
