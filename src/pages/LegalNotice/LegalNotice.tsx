import { useTranslation } from "react-i18next";

const LegalNotice: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">
        {t("legal.title", "Legal Notice")}
      </h1>
      <div className="prose max-w-none">
        {t("legal.content", "Legal notice content goes here.")}
      </div>
    </div>
  );
};

export default LegalNotice;
