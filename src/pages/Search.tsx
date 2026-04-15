import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import Wrapper from "@/components/Wrapper";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header title="Поиск" onClickLeft={() => navigate(-1)} />
      <Layout>
        <div>Search</div>
      </Layout>
      <Navbar />
    </Wrapper>
  );
};

export default Search;
