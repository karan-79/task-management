import {createElement, FC, PropsWithChildren} from "react";

type TypographyProps = PropsWithChildren<{
    className?: string
}>

function TypographyH1({children, className = "", ...props}: TypographyProps) {
    return (
        <h1 className={"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" + " " + className} {...props}>
            {children}
        </h1>
    )
}

function TypographyH2({children, className = "", ...props}: TypographyProps) {
    return (
        <h2 className={"scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0" + " " + className} {...props}>
            {children}
        </h2>
    )
}

function TypographyH3({children, className = "", ...props}: TypographyProps) {
    return (
        <h3 className={"scroll-m-20 text-2xl font-semibold tracking-tight" + " " + className} {...props}>
            {children}
        </h3>
    )
}

function TypographyH4({children, className = "" , ...props}: TypographyProps) {
    return (
        <h4 className={"scroll-m-20 text-xl font-semibold tracking-tight" + " " + className} {...props}>
            {children}
        </h4>
    )
}

function TypographyH5({children, className = "" , ...props}: TypographyProps) {
    return (
        <h4 className={"scroll-m-20 text-lg font-semibold tracking-tight" + " " + className} {...props}>
            {children}
        </h4>
    )
}

function TypographyH6({children, className = "" , ...props}: TypographyProps) {
    return (
        <h4 className={"scroll-m-20 text-sm font-semibold tracking-tight" + " " + className} {...props}>
            {children}
        </h4>
    )
}

function TypographyP({children, className = "", ...props}: TypographyProps) {
    return (
        <p className={"leading-7 [&:not(:first-child)]:mt-6" + " " + className} {...props}>
            {children}
        </p>
    )
}

function getElementFormVariant(variant) {
    switch(variant) {
        case "h1":
            return TypographyH1;
        case "h2":
            return TypographyH2;
        case "h3":
            return TypographyH3;
        case "h4":
            return TypographyH4;
        case "h5":
            return TypographyH5;
        case "h6":
            return TypographyH6;
        case "p":
            return TypographyP;
    };
}

export type TypographyVariants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"

type Props = {
    variant: TypographyVariants
    onClick?: () => void
} & TypographyProps

const Typography : FC<Props> = ({variant, children, ...props}) => {
    return createElement(getElementFormVariant(variant), props , children)
}

export default Typography

