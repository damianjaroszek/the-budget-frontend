import React from 'react';

interface Props {
    color: string;
    bgColor: string;
    text: string;
    borderRadius: string;
    size?: string;
}

export const Button = ({color, bgColor, text, borderRadius, size}: Props) => {
    return (
        <button
            type="button"
            style={{
                backgroundColor: bgColor,
                color,
                borderRadius
            }}
            className={`text-${size} p-3 hover:drop-shadow-xl`}
        >
            {text}
        </button>
    )
}
