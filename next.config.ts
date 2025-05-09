import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Ensures static HTML export
  basePath: "/my-project", // (Optional) Set this if you are hosting in a subdirectory
  trailingSlash: true, // (Optional) Adds trailing slashes to URLs
};

export default nextConfig;
