import { Layout } from "@/layouts";
import { HomePage } from "@/pages";
import { AuthCallbackPage } from "@/pages/AuthCallbackPage";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />  
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export { AppRoutes };
