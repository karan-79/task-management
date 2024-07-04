import Router from "@/Router";
import { ThemeProvider } from "@/Providers/ThemeProvider.tsx";
import { useLoggedInUser } from "@/store/userStore.ts";
import { Suspense, useEffect, useLayoutEffect } from "react";
import { http } from "@/config/axiosConfig.ts";
import { getUserData, refreshToken } from "@/service/userService.ts";
import { Identity } from "@/utils.ts";
import { useNavigate } from "react-router-dom";

function App() {
  const { user, token, setUser } = useLoggedInUser(Identity);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const reqInterceptor = http.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${jwt}`;
        return config;
      });

      getUserData()
        .then((data) => {
          setUser(data);
          navigate("/home");
        })
        .catch(() => setUser(null));

      return () => http.interceptors.request.eject(reqInterceptor);
    }
  }, [token]);

  useLayoutEffect(() => {
    const responseInterceptor = http.interceptors.response.use(
      Identity,
      (error) => {
        const ogReq = error.config;

        if (
          error.response.status === 401 &&
          error.response.data.statusCode === 419
        ) {
          console.log("response interceprtor");
          return refreshToken()
            .then((t) => {
              localStorage.setItem("jwt", t);
              ogReq.headers.Authorization = `Bearer ${t}`;

              return http(ogReq);
            })
            .catch(() => setUser(null));
        } else if (
          error.response.statusCode === 401 &&
          error.response.data.statusCode === 401
        ) {
          console.log("set token null 401 all");
          setUser(null);
        }
      },
    );
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <Suspense fallback={<>Loading..</>}>
        <Router />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
