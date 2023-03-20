import React from 'react';

interface Props {
    color: string;
    bgColor: string;
    text: string;
    borderRadius: string;
    size?: string;
    type?: "button" | "submit" | "reset" | undefined;
}

export const Button = ({color, bgColor, text, borderRadius, size, type}: Props) => {
    return (
        <button
            type={type}
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
