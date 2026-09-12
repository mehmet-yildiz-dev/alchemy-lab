import { ShowcaseShell } from "@/src/components/showcase-shell";
import { ThemeLabProvider } from "@/src/components/theme-lab-provider";
import { FoundationsPage } from "@/src/pages/foundations-page";
import { HomePage } from "@/src/pages/home-page";
import { NotFoundPage } from "@/src/pages/not-found-page";
import { PatternsPage } from "@/src/pages/patterns-page";
import { UiPage } from "@/src/pages/ui-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ThemeLabProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<ShowcaseShell />}>
            <Route index element={<HomePage />} />
            <Route path="foundations" element={<FoundationsPage />} />
            <Route path="ui" element={<UiPage />} />
            <Route path="patterns" element={<PatternsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeLabProvider>
  );
}

export { App };
