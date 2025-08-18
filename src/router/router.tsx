import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthGuard } from "../guards/auth.guard";

export const AppRouter = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes location={location} key={location.pathname}>
        <Route element={<AuthGuard />}></Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  );
};
