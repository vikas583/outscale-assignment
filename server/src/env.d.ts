declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      JWT_SECRET: string;
      CORS_DOMAINS: string;
      
    }
  }
}

export {}
