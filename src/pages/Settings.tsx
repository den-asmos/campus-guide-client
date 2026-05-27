import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Wrapper from "@/components/Wrapper";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header
        title="Настройки"
        leftIcon={<ChevronLeft />}
        onClickLeft={() => navigate(-1)}
      />
      <Layout>
        <div>Settings</div>
      </Layout>
    </Wrapper>
  );
};

export default Settings;
