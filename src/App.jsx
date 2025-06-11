import "./App.css";
import ROUTES from "./routes/routes";
import WishlistProvider from "./Context/wishlistContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { MainProvider, useMainContext } from "@Context/MainContext";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { ENDPOINTS } from "@utils/constants/Endpoints";
import { jwtDecode } from "jwt-decode";
const queryClient = new QueryClient();

function AppContent() {
  const router = createBrowserRouter(ROUTES);

  const [isLogin, setIsLogin] = useState(false);
  const [userShort, setUserShort] = useState({});
  const { updateMultipleData } = useMainContext();

  useEffect(() => {
    if (updateMultipleData) {
      updateMultipleData({
        isLogin: isLogin,
        setIsLogin: setIsLogin,
        userShort: userShort,
      });
    }
  }, [isLogin, userShort]);
  useEffect(() => {
    async function getUserSummary() {

      const token =
        Cookies.get("token") || sessionStorage.getItem("token") || null;

      if (token) {
        try {
          const res = await axios.get(ENDPOINTS["is-authenticated"], {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const decoded = jwtDecode(token);

          const userShort = {
            name: decoded[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ],
            email:
              decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
              ],
            givenName:
              decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
              ],
            surname:
              decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
              ],
          };

          setUserShort(userShort);
          setIsLogin(res);
        } catch (error) {
          Cookies.remove("token");
          sessionStorage.removeItem("token");
          setIsLogin(false);
          console.error("Unauthorized access", error);
        }
      } else {
        setIsLogin(false);
      }
    }

    getUserSummary();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <WishlistProvider>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          closeOnClick
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />
        <RouterProvider router={router} />
      </WishlistProvider>
    </QueryClientProvider>
  );
}

function App() {
  return (
    <MainProvider>
      <AppContent />
    </MainProvider>
  );
}

export default App;
