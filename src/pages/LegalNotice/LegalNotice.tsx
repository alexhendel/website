import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { loadMarkdownContent, markdownKeys } from "../../utils/markdown";
import Loading from "../../components/Loading/Loading";
import Markdown from "../../components/Markdown/Markdown";

const LegalNotice: React.FC = () => {
  const { t, i18n } = useTranslation();

  const {
    data: content = "",
    isLoading,
    error,
  } = useQuery({
    queryKey: markdownKeys.content(i18n.language, "legal"),
    queryFn: () => loadMarkdownContent(i18n.language, "legal"),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-red-600">{t("errors.loading")}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <Markdown content={content} />
    </div>
  );
};

export default LegalNotice;
