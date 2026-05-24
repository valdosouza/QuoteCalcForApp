// Ambient declarations for Next.js 13 sub-path modules
// (needed when next package ships without .d.ts files in this environment)
declare module 'next/head' {
  import React from 'react';
  interface HeadProps { children?: React.ReactNode; }
  const Head: React.FC<HeadProps>;
  export default Head;
}

declare module 'next/app' {
  import type { AppProps as NextAppProps } from 'next/dist/shared/lib/router/router';
  export type AppProps = NextAppProps;
}

declare module 'next/document' {
  import React from 'react';
  export default class Document extends React.Component {}
  export class Html extends React.Component<React.HTMLAttributes<HTMLHtmlElement>> {}
  export class Head extends React.Component {}
  export class Main extends React.Component {}
  export class NextScript extends React.Component {}
}

declare module 'next' {
  export type { NextApiRequest, NextApiResponse } from 'next/types';
}

declare module 'next/types' {
  export interface NextApiRequest {
    method?: string;
    body: any;
    query: Record<string, string | string[]>;
    headers: Record<string, string | string[] | undefined>;
    cookies: Record<string, string>;
  }
  export interface NextApiResponse<T = any> {
    status(code: number): NextApiResponse<T>;
    json(body: T): void;
    send(body: T): void;
    end(): void;
  }
}
