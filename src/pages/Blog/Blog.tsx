import { useTranslation } from "react-i18next";

const Blog: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">{t("blog.title", "Blog")}</h1>
      <p>{t("blog.description", "Here you'll find my latest blog posts.")}</p>
    </div>
  );
};

export default Blog;
