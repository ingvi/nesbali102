import type { NextConfig } from "next";
import { DEFAULT_LANG } from "./lib/i18n";

const nextConfig: NextConfig = {
  // Pin the workspace root so a stray lockfile above this directory is ignored.
  turbopack: {
    root: __dirname,
  },

  // The listing lives at /is and /en; the bare domain lands on Icelandic.
  async redirects() {
    return [{ source: "/", destination: `/${DEFAULT_LANG}`, permanent: false }];
  },
};

export default nextConfig;
