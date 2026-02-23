import { createStart } from "@tanstack/react-start";

export const startInstance = createStart(() => ({
  defaultSsr: "data-only"
}));
