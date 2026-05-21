import { Outlet, ScrollRestoration } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function Layout() {
  return (
    <div className="mx-auto max-w-[1400px] bg-white shadow-[0_0_60px_rgba(0,0,0,0.5)]">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollRestoration />
    </div>
  );
}
