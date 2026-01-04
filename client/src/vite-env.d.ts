/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GITHUB_PAGES: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
