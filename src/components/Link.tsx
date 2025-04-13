"use client";

import { forwardRef } from "react";
import NextLink from "next/link";
import { Link as MuiLink, SxProps } from "@mui/material";
import { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { LinkProps as NextLinkProps } from "next/link";

/*
Goal of this component:

1. Uses the 'use client' directive since it includes client-side interactivity
2. Forwards refs properly
3. Supports both MUI's styling props and Next.js Link props
4. Maintains proper TypeScript types
5. Works with the App Router

*/

type LinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  sx?: SxProps;
} & Omit<MuiLinkProps, "href"> &
  Omit<NextLinkProps, "href" | "children">;

/** A wrapper around Next.js's Link component that also supports external links. */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, external, children, sx, ...props }, ref) => {
    const isExternal = external || href.startsWith("http");

    if (isExternal) {
      return (
        <MuiLink
          component="a"
          href={href}
          ref={ref}
          target="_blank"
          sx={sx}
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </MuiLink>
      );
    }

    return (
      <MuiLink component={NextLink} href={href} ref={ref} sx={sx} {...props}>
        {children}
      </MuiLink>
    );
  }
);

Link.displayName = "Link";

export default Link;
