import Head from "next/head";
// import About from "../components/About";
import Cta from "../components/Cta";
import Header from "../components/Header";
import Rounds from "../components/Rounds";
export default function Home() {
  return (
    <>
      <Head>
        <title>Faisaa</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="FaisaaX a AMM Powered DEX with Atomicswap Protocol is a project built by the community for the community. The project aims to facilitate decentralised finance to its users by utilising the latest blockchain CoreDAO.
          "
        />
        <link rel="shortcut icon" href="/assets/logo-square.png" />
      </Head>
      <Header />
      <main className="main">
        <Cta />
      </main>
      {/* <About /> */}
      <Rounds />
    </>
  );
}
