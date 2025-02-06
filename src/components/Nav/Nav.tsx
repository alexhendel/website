import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Nav: React.FC = () => {
  const { t, i18n } = useTranslation();

  // Get the appropriate routes based on language
  const getLegalRoute = () =>
    i18n.language.startsWith("de") ? "/impressum" : "/legal-notice";
  const getPrivacyRoute = () =>
    i18n.language.startsWith("de") ? "/datenschutz" : "/privacy-notice";

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              {t("nav.home")}
            </Link>
          </li>
          <li>
            <Link to="/blog" className="text-gray-600 hover:text-gray-900">
              {t("nav.blog")}
            </Link>
          </li>
          <li>
            <Link
              to={getLegalRoute()}
              className="text-gray-600 hover:text-gray-900"
            >
              {t("nav.legal")}
            </Link>
          </li>
          <li>
            <Link
              to={getPrivacyRoute()}
              className="text-gray-600 hover:text-gray-900"
            >
              {t("nav.privacy")}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
