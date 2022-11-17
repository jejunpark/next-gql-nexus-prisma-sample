import { QueryClient, QueryClientProvider } from "react-query";
import "../../styles/globals.css";
import Head from "next/head";
import { queryClient } from "../client/react-query";

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>To Do App</title>
        <meta property="og:type" content="website" key="type" />
        <meta property="og:title" content="To Do App" key="title" />
        <meta
          property="og:description"
          content="샘플 To Do App 입니다.\nNext.js, GraphQL, Nexus, Prisma, React Query 등을 이용하여 만들어져 있습니다."
          key="description"
        />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
