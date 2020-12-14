import React, { forwardRef } from 'react';
import type { HTMLProps, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

type PageProps = {
  children?: ReactNode;
  title?: string;
} & HTMLProps<HTMLDivElement>;

const Page = forwardRef<HTMLDivElement, PageProps>(
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
