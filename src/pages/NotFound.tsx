import Layout from "@/components/Layout";
import Wrapper from "@/components/Wrapper";

const NotFound = () => {
  return (
    <Wrapper>
      <Layout>
        <div className="flex flex-grow flex-col items-center justify-center space-y-1">
          <p className="text-button-primary text-4xl">404</p>
          <p className="text-lg">Страница не найдена</p>
        </div>
      </Layout>
    </Wrapper>
  );
};

export default NotFound;
