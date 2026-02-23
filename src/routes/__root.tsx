import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import type React from "react";

export const Route = createRootRoute({
  head: () => ({
    meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }],
    links: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }]
  }),
  shellComponent: RootShell,
  component: RootComponent
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className="iframe"
    >
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
