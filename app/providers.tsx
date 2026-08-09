"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { Provider as StyletronProvider } from "styletron-react";
import { Client, Server } from "styletron-engine-monolithic";
import { BaseProvider } from "baseui";
import { theme } from "./theme";

/**
 * Styletron needs a different engine on each side of the render: the Server
 * engine collects the stylesheets so Next can inline them into the document,
 * the Client engine picks them back up and takes over on hydration.
 */
function createEngine() {
  return typeof window === "undefined" ? new Server() : new Client();
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [engine] = useState(createEngine);

  useServerInsertedHTML(() => {
    const server = engine as Server;
    if (typeof server.getStylesheets !== "function") return null;
    const sheets = server.getStylesheets();
    return (
      <>
        {sheets.map((sheet, i) => (
          <style
            key={i}
            className="_styletron_hydrate_"
            dangerouslySetInnerHTML={{ __html: sheet.css }}
            media={sheet.attrs.media}
            data-hydrate={sheet.attrs["data-hydrate"]}
          />
        ))}
      </>
    );
  });

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={theme}>{children}</BaseProvider>
    </StyletronProvider>
  );
}
