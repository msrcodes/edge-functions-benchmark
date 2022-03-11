import {NextSeo} from 'next-seo';
import type {AppProps} from 'next/app';

import Layout from '../components/Layout';

import '../styles/global.css';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <>
      <NextSeo
        title="Edge Functions Benchmark"
        description="A benchmark of Edge Functions, for final year Distributed Systems coursework."
        additionalLinkTags={[
          {rel: 'icon', href: '/favicon.png'},
          {rel: 'apple-touch-icon', href: '/favicon-180.png', sizes: '180x180'},
        ]}
        noindex
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default App;
