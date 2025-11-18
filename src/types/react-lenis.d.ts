declare module "@studio-freight/react-lenis" {
  import { ReactNode } from "react";

  export interface ReactLenisProps {
    root?: boolean;
    children?: ReactNode;
    className?: string;
    options?: any;
  }

  export function ReactLenis(props: ReactLenisProps): JSX.Element;
}
