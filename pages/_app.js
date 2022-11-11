import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname === "/Signup" || router.pathname === "/Login")
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    );

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
