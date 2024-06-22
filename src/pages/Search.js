//UI
import Layout from "../UI/Layout";

//component
import WebtoonSearchList from "../components/webtoonSearch/WebtoonSearchList";
import Footer from "../components/footer/Footer";

const Search = () => {
  return (
    <Layout>
      <WebtoonSearchList />
      <Footer />
    </Layout>
  );
};

export default Search;
