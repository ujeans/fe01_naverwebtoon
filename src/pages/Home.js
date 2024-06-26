import { Helmet } from "react-helmet-async";
import { Suspense, lazy, useEffect, useState } from "react";
// UI
import Layout from "../UI/Layout";
// components
// import MonthNewWebtoonUI from "../components/monthnewwebtoon/MonthNewWebtoonUI";
// import DaysWebtoonList from "../components/webtoonList/DaysWebtoonList";
import Footer from "../components/footer/Footer";
import WebtoonDayHeader from "../components/webtoonHeader/WebtoonDayHeader";

// Lazy loading
const MonthNewWebtoonUI = lazy(() =>
  import("../components/monthnewwebtoon/MonthNewWebtoonUI")
);
const DaysWebtoonList = lazy(() =>
  import("../components/webtoonList/DaysWebtoonList")
);

const Home = () => {
  const [allWebtoons, setAllWebtoons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllWebtoons = async () => {
      setLoading(true);
      try {
        const apiURL = `${process.env.REACT_APP_API}/webtoons?provider=NAVER&perPage=100`;

        const initialResponse = await fetch(apiURL + `&page=1`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!initialResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const initialData = await initialResponse.json();
        const totalWebtoons = initialData.total;
        const perPage = 100;
        const totalPages = Math.ceil(totalWebtoons / perPage);

        const requests = [];
        for (let page = 1; page <= totalPages; page++) {
          requests.push(
            fetch(apiURL + `&page=${page}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }).then(response => response.json())
          );
        }

        const results = await Promise.all(requests);
        const allWebtoons = results.flatMap(result => result.webtoons);

        const filteredWebtoons = allWebtoons.filter(
          webtoon => !webtoon.isEnd && webtoon.updateDays.length > 0
        );

        setAllWebtoons(filteredWebtoons);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllWebtoons();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>요일 전체 : 네이버 웹툰</title>
      </Helmet>

      <WebtoonDayHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <MonthNewWebtoonUI webtoons={allWebtoons} loading={loading} />
        <DaysWebtoonList webtoons={allWebtoons} loading={loading} />
      </Suspense>
      <Footer />
    </Layout>
  );
};

export default Home;
