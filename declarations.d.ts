import type { FC, SVGProps } from "react";

declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg" { 
    const ReactComponent: FC<SVGProps<SVGSVGElement>>;
    const content: string;
    export { ReactComponent };
    export default content;
}