import Link from 'next/link';
import {PropsWithChildren} from 'react';

const Layout = ({children}: PropsWithChildren<{}>) => (
  <>
    <Link
      href="https://github.com/mikaelsrozee/edge-functions-benchmark"
      passHref
    >
      <a className="bg-blue-500 font-bold text-white fixed shadow-md px-16 pt-16 pb-2 rotate-45 -top-5 -right-16">
        Source
      </a>
    </Link>
    {children}
  </>
);

export default Layout;
