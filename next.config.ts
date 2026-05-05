import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Lockfiles exist both here and in the parent folder (`DreamWorks /`). Turbopack
// otherwise picks the parent as the workspace root and fails to resolve
// `tailwindcss` from this app's node_modules.
const appRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: appRoot,
  },
};

export default nextConfig;
