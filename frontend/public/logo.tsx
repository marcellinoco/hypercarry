import * as React from "react";
import { SVGProps } from "react";

import { cn } from "@/lib/utils";

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
  primaryShape?: string;
  secondaryShape?: string;
}

const Logo = ({
  size = 96,
  primaryShape = "fill-black",
  secondaryShape = "fill-black",
  className,
  ...props
}: LogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 96 96"
    className={cn(className)}
    {...props}
  >
    <path
      className={cn(primaryShape)}
      fillRule="evenodd"
      d="m46.095 12.587-26.65 33.917a2.423 2.423 0 0 0 0 2.992l26.65 33.917A2.422 2.422 0 0 0 48 84.34a2.422 2.422 0 0 0 1.905-.926l26.65-33.917a2.423 2.423 0 0 0 0-2.992l-26.65-33.917A2.417 2.417 0 0 0 48 11.66a2.422 2.422 0 0 0-1.905.926ZM25.16 47.07l20.417-25.983v35.265L25.16 47.07Zm45.68 0-20.417 9.282V21.087L70.84 47.07Z"
      clipRule="evenodd"
    />
    <path
      className={cn(secondaryShape)}
      d="M80.365 43.512a7.268 7.268 0 0 1 0 8.976L58.791 79.946l1.303 3.046a2.302 2.302 0 0 0 .04.09l.013.024a2.219 2.219 0 0 0 3.32.79l31.645-23.71.019-.014.029-.023.072-.06.023-.02a2.223 2.223 0 0 0 .566-2.532l-15.55-36.355a2.22 2.22 0 0 0-3.373-.904l-9.308 6.974 12.775 16.26ZM28.41 27.252l-12.775 16.26a7.268 7.268 0 0 0 0 8.977L37.21 79.947l-1.303 3.046a2.217 2.217 0 0 1-2.462 1.307 2.22 2.22 0 0 1-.912-.403L.889 60.186a2.245 2.245 0 0 1-.12-.097l-.023-.02a2.223 2.223 0 0 1-.566-2.532l15.55-36.355a2.22 2.22 0 0 1 3.373-.904l9.308 6.974Z"
    />
  </svg>
);

export default Logo;
