import { Helmet } from "react-helmet-async";
import { Suspense, lazy } from "react";
// UI
import Layout from "../UI/Layout";
// components
import Header from "../components/webtoonList/WeekWebtoon";
import Footer from "../components/footer/Footer";
// Lazy loading components
const MonthNewWebtoonUI = lazy(() =>
  import("../components/monthnewwebtoon/MonthNewWebtoonUI")
);
const DaysWebtoonList = lazy(() =>
  import("../components/webtoonList/DaysWebtoonList")
);

const Home = () => {
  return (
    <Layout>
      <Helmet>
        <title>요일 전체 : 네이버 웹툰</title>
      </Helmet>

      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <MonthNewWebtoonUI />
        <DaysWebtoonList />
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default Home;
