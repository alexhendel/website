import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [showContact, setShowContact] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);

  const legalPath = currentLanguage === "de" ? "/impressum" : "/legal-notice";
  const privacyPath =
    currentLanguage === "de" ? "/datenschutz" : "/privacy-notice";

  // Anti-bot email protection
  const email = t("contact.email");
  const [emailUser, emailDomain] = email.split("@");
  const getEmail = () => `${emailUser}@${emailDomain}`;

  // Anti-bot phone protection
  const phoneDigits = t("contact.phone").split(" ").join("");
  const formatPhone = (digits: string) => {
    return digits.replace(
      /(\+\d{2})(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1 $2 $3 $4 $5"
    );
  };

  const handleContactClick = () => {
    setShowContact(true);
  };

  const handleLogoHover = () => {
    if (!isWiggling) {
      setIsWiggling(true);
      setTimeout(() => setIsWiggling(false), 1000);
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4">{t("nav.contact")}</h3>
            <div className="text-sm space-y-2">
              <p className="font-medium">{t("contact.name")}</p>
              <p>{t("contact.address")}</p>
              {showContact ? (
                <>
                  <p>
                    <a
                      href={`mailto:${getEmail()}`}
                      className="hover:text-gray-300 transition-colors"
                    >
                      {getEmail()}
                    </a>
                  </p>
                  <p>
                    <a
                      href={`tel:${phoneDigits}`}
                      className="hover:text-gray-300 transition-colors"
                    >
                      {formatPhone(phoneDigits)}
                    </a>
                  </p>
                </>
              ) : (
                <button
                  onClick={handleContactClick}
                  className="text-gray-300 hover:text-white transition-colors underline"
                >
                  {t("contact.show")}
                </button>
              )}
            </div>
          </div>

          {/* Logo Section */}
          <div className="flex flex-col items-center justify-start">
            <div className="cursor-pointer" onMouseEnter={handleLogoHover}>
              <img
                src="/favicon.svg"
                alt="Logo"
                className={`h-12 w-12 mb-4 text-white [&>g]:fill-current [&>g]:stroke-current transition-all duration-300 hover:scale-110 ${
                  isWiggling ? "animate-wiggle" : ""
                }`}
                style={{ filter: "invert(1)" }}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-semibold mb-4">{t("nav.links")}</h3>
            <nav className="flex flex-col space-y-2 items-center md:items-end">
              <Link
                to={legalPath}
                className="hover:text-gray-300 transition-colors"
              >
                {t("nav.legal")}
              </Link>
              <Link
                to={privacyPath}
                className="hover:text-gray-300 transition-colors"
              >
                {t("nav.privacy")}
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright Section - Full Width */}
        <div className="border-t border-gray-700 pt-8">
          <div className="text-sm text-center">
            © {format(new Date(), "yyyy")} {t("footer.copyright")}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
