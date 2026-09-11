import { ShowcaseHeader } from "@/src/components/showcase-header";
import { ThemeSidebar } from "@/src/components/theme-sidebar";
import { applyRouteSeo } from "@/src/config/seo";
import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";

function ShowcaseShell() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  React.useEffect(() => {
    applyRouteSeo(location.pathname);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background tablet:grid tablet:grid-cols-[17rem_minmax(0,1fr)]">
      <ThemeSidebar />
      <div className="min-w-0">
        <ShowcaseHeader />
        <main className="mx-auto w-full max-w-[96rem] px-4 py-8 tablet:px-7 desktop:px-10 desktop:py-10">
          <Outlet />
        </main>
        <footer className="mx-4 border-t border-border/30 py-6 text-xs text-muted-foreground tablet:mx-7 desktop:mx-10">
          <span aria-hidden="true">⚗️ </span>
          Crafted with Digital Alchemy · © {currentYear}{" "}
          <a
            className="text-link underline-offset-4 hover:underline"
            href="https://mehmetyildiz.dev/"
            target="_blank"
            rel="noreferrer"
          >
            Mehmet Yıldız
          </a>
        </footer>
      </div>
    </div>
  );
}

export { ShowcaseShell };
