import { useTranslation } from "react-i18next";

const PrivacyNotice: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">
        {t("privacy.title", "Privacy Notice")}
      </h1>
      <div className="prose max-w-none">
        {t("privacy.content", "Privacy notice content goes here.")}
      </div>
    </div>
  );
};

export default PrivacyNotice;
