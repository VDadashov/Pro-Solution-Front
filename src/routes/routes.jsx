import SiteRoot from "@pages/site/SiteRoot";
import Home from "@pages/site/Home";
import Contact from "@pages/site/Contact";
import Category from "@pages/site/Category";
import CategoryDetail from "@pages/site/CategoryDetail";
import MyAccount from "@pages/site/MyAccount";
import Wishlist from "@pages/site/Wishlist";
import Blog from "@pages/site/Blog/Index";
import BlogList from "@components/site/Blog/BlogCardsContainer";
import BlogDetail from "@components/site/Blog/BlogDetail";
import ErrorPage from "@pages/site/Error";
import Orders from "@components/site/MyAccount/Orders";
import LoginRegister from "@components/site/MyAccount/LoginRegister";
import ControlPanel from "@components/site/MyAccount/ControlPanel";
import Downloads from "@components/site/MyAccount/Downloads";
import Address from "@components/site/MyAccount/Address";
import AccountDetails from "@components/site/MyAccount/AccountDetails";
import ScrollToTop from "@components/site/common/ScrollToTop/ScrollToTop";

const ROUTES = [
  {
    path: "/",
    element: (
      <ScrollToTop>
        <SiteRoot />
      </ScrollToTop>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/category/:id",
        element: <CategoryDetail />,
      },
      {
        path: "/myaccount",
        element: <MyAccount />,
        children: [
          {
            index: true,
            element: <ControlPanel />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "downloads",
            element: <Downloads />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "account_details",
            element: <AccountDetails />,
          },
        ],
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/blog",
        element: <Blog />,
        children: [
          {
            index: true,
            element: <BlogList />,
          },
          {
            path: "ram-nedir",
            element: <BlogDetail />,
          },
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
];

export default ROUTES;
