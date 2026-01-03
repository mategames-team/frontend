declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.svg?react' {
  import React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;

  const src: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default src;
}
