import { Fragment, Suspense } from "react";
import { Outlet } from "react-router-dom";
import useIsCollapsed from "@/hooks/use-is-collapsed";
import Loader from "../common/loader";
import Sidebar from "../layout/sidebar";
import { Layout, LayoutBody, LayoutHeader } from "../custom/layout";
import ThemeSwitch from "../theme-switch";
import { TopNav } from "../layout/top-nav";
import { UserNav } from "../layout/user-nav";

const AuthorizedOutlet = () => {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  //   const { userFound } = useAuthUserContext();
  //   const { pathname } = useLocation();

  //   if (!userFound) {
  //     return <Navigate to={"/login"} state={{ authSuccessRedirect: pathname }} />;
  //   }

  return (
    <Fragment>
      <div className="relative h-full overflow-hidden bg-background">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main
          id="content"
          className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
            isCollapsed ? "md:ml-14" : "md:ml-64"
          } h-full`}
        >
          <Layout>
            <LayoutHeader>
              <TopNav links={topNav} />
              <div className="ml-auto flex items-center space-x-4">
                <ThemeSwitch />
                <UserNav />
              </div>
            </LayoutHeader>
            <LayoutBody>
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </LayoutBody>
          </Layout>
        </main>
      </div>
    </Fragment>
  );
};

const topNav = [
  {
    title: "Overview",
    href: "dashboard/overview",
    isActive: true,
  },
  {
    title: "Customers",
    href: "dashboard/customers",
    isActive: false,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
  },
];

export default AuthorizedOutlet;
