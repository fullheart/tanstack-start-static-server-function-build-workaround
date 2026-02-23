import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface Page {
  users: User[];
}
// Fetch data during build-time (static generation)
// See 'Static Server Functions': https://tanstack.com/start/latest/docs/framework/react/guide/static-server-functions
const fetchData = createServerFn({ method: "GET" })
  .middleware([staticFunctionMiddleware])
  .handler(async () => {
    // Fetch data of the Docker server `http-server` that is in the same network
    const res = await fetch("http://http-server:8090/data.json");

    if (!res.ok) throw new Error("Failed to fetch page");

    return (await res.json()) as Page;
  });

export const Route = createFileRoute("/page")({
  ssr: "data-only",
  loader: async () => await fetchData(),
  component: PageWithStaticServerFunction
});

function PageWithStaticServerFunction() {
  const page = Route.useLoaderData() as Page;
  return <div>Page data: {JSON.stringify(page)}</div>;
}
