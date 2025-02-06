import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">{t("home.title", "Home")}</h1>
      <p>{t("home.welcome", "Welcome to my website!")}</p>
    </div>
  );
};

export default Home;
