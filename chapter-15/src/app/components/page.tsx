import React, { forwardRef, HTMLProps, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

type Props = {
  children?: ReactNode;
  title?: string;
} & HTMLProps<HTMLDivElement>;

const Page = forwardRef<HTMLDivElement, Props>(
  ({ children, title = '', ...rest }, ref) => {
    return (
      <div ref={ref as any} {...rest}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {children}
      </div>
    );
  },
);

export default Page;
