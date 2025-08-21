import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthGuard } from "../guards/auth.guard";
import { PublicRoutes } from "./router.config";

export const AppRouter = () => {
  const location = useLocation();

  const Library = lazy(() => import("../pages/private/Library/LibraryPage").then(module => ({ default: module.Library })));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes location={location} key={location.pathname}>
        <Route path={PublicRoutes.LIBRARY} element={<Library />} />
        <Route element={<AuthGuard />}></Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  );
};
