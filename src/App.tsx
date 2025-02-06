import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./i18n";

import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import LegalNotice from "./pages/LegalNotice/LegalNotice";
import PrivacyNotice from "./pages/PrivacyNotice/PrivacyNotice";
import Nav from "./components/Nav/Nav";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Nav />
          <main className="py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              {/* Legal Notice - English and German routes */}
              <Route path="/legal-notice" element={<LegalNotice />} />
              <Route path="/impressum" element={<LegalNotice />} />
              {/* Privacy Notice - English and German routes */}
              <Route path="/privacy-notice" element={<PrivacyNotice />} />
              <Route path="/datenschutz" element={<PrivacyNotice />} />
            </Routes>
          </main>
        </div>
      </Router>
      {import.meta.env.MODE !== "production" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};

export default App;
