import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Wrapper from "@/components/Wrapper";
import { useNavigate } from "react-router-dom";

const Settings = () => {
	const navigate = useNavigate();

	return (
		<Wrapper>
			<Header title="Настройки" onClickLeft={() => navigate(-1)} />
			<Layout>
				<div>Settings</div>
			</Layout>
		</Wrapper>
	);
};

export default Settings;
