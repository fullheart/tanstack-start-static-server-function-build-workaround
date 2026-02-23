# TanStack Start - Static Server Function Build Workaround

The cached assets created by the [Static Server Function](https://tanstack.com/start/latest/docs/framework/solid/guide/static-server-functions) are not delivered. Instead, this function is re-executed each time the page is called up.

Here is a workaround to fix the problem until the TanStack team has resolved it. You can find the solution in the script: [`scripts/cache-static-assets-during-build/build.sh`](scripts/cache-static-assets-during-build/build.sh)

## Run the reproduction of the problem

1. Start TanStack Start with Docker
   ```sh
   dc_file=docker-compose.reproduce-problem.yaml \
       && docker compose -f $dc_file build \
       && docker compose -f $dc_file up
   ```
2. Reload this TanStack Start Route `/page` multiple times in your Browser: http://localhost:3000/page.
3. In the Docker Compose logs, you will see a request to the `http-server` **on each page reload**. That should not be the case, because this are static data.
   ```sh
    reproduce-problem-http-server-1  | [2026-02-23T20:14:45.340Z]  "GET /data.json" "node"
    reproduce-problem-http-server-1  | [2026-02-23T20:14:45.765Z]  "GET /data.json" "node"
    reproduce-problem-http-server-1  | [2026-02-23T20:14:45.925Z]  "GET /data.json" "node"
    reproduce-problem-http-server-1  | [2026-02-23T20:14:46.110Z]  "GET /data.json" "node"
    reproduce-problem-http-server-1  | [2026-02-23T20:14:46.265Z]  "GET /data.json" "node"
    ...
   ```

## Run the workaround

1. Start TanStack Start with Docker
   ```sh
   dc_file=docker-compose.workaround-problem.yaml \
       && docker compose -f $dc_file build \
       && docker compose -f $dc_file up
   ```
2. Reload this TanStack Start Route `/page` multiple times in your Browser: http://localhost:3000/page.
3. In the Docker Compose logs, you will see **only one request** to the 'http-server'. Thats the correct behaviour.
   ```sh
   workaround-problem-http-server-1  | [2026-02-23T20:15:30.654Z]  "GET /data.json" "node"
   ```
