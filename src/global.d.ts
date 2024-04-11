// global.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_GOOGLE_CALENDAR_ACCESS_TOKEN: string;
    // Add other environment variables as needed
  }
}
