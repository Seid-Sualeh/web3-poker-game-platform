import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingScreen from "../loading/LoadingScreen";

// Lazy load pages for code splitting
const Play = lazy(() => import("../../pages/Play"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));
const ConnectWallet = lazy(() => import("../../pages/ConnectWallet"));

// Loading fallback component
const PageLoader = () => <LoadingScreen />;

const AppRoutes = () => {
  useEffect(() => {}, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<ConnectWallet />} />
        <Route path="/play" element={<Play />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
