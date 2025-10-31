declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_GEMINI_API_KEY?: string;
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
};
