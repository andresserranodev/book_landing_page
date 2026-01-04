/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GITHUB_PAGES: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// vite-imagetools: Allow importing images with query parameters
// TypeScript doesn't support wildcards in query strings, so we declare a broad catch-all
declare module "*?format=*" {
  const src: string;
  export default src;
}

declare module "*?w=*" {
  const src: string;
  export default src;
}

declare module "*?quality=*" {
  const src: string;
  export default src;
}
