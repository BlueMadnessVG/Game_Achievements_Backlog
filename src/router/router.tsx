import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthGuard } from "../guards/auth.guard";
import { PublicRoutes } from "./router.config";
import { AnimatePresence } from "motion/react";

export const AppRouter = () => {
  const location = useLocation();

  const Library = lazy(() =>
    import("../pages/private/Library/LibraryPage").then((module) => ({
      default: module.Library,
    }))
  );
  const Game = lazy(() =>
    import("../pages/private/Game/GamePage").then((module) => ({
      default: module.GamePage,
    }))
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path={PublicRoutes.LIBRARY} element={<Library />} />
          <Route path={PublicRoutes.GAME} element={<Game />} />
          <Route element={<AuthGuard />}></Route>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};
