import React, { useEffect, useState } from "react";
// import { useStore, useActions } from "./Store";
import axios from "axios";

// let's pretend the company is called ACME
export const isACMEDomain = url => {
  return /^([^/]+:)?\/{2,3}[^/]+?(\.ACME\.com|\.acme)(:|\/|$)/i.test(url);
};

function Interceptor() {
  
  const [errorInterceptor, setErrorInterceptor] = useState(undefined);
  console.log('🚀 ~ errorInterceptor', errorInterceptor);
  const [authInterceptor, setAuthInterceptor] = useState(undefined);

//   const addAuthInterceptor = () => {
//     const authInterceptor = axios.interceptors.request.use(
//       config => {
//         if (!config.headers.hasOwnProperty("Authorization")) {
//           if (auth.accessToken && isACMEDomain(config.url)) {
//             config.headers.Authorization = auth.accessToken;
//           }
//         } else if (!config.headers.Authorization) {
//           delete config.headers.Authorization;
//         }
//         return config;
//       },
//       error => {
//         return Promise.reject(error);
//       }
//     );
//     setAuthInterceptor(authInterceptor);
//   };

//   const removeAuthInterceptor = () => {
//     axios.interceptors.request.eject(authInterceptor);
//     setAuthInterceptor(undefined);
//   };

  const addErrorInterceptor = () => {
    const errorInterceptor = axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error) {
            let message = "Something went wrong.";
        }
        return Promise.reject(error);
      }
    );
    setErrorInterceptor(errorInterceptor);
  };

  const removeErrorInterceptor = () => {
    axios.interceptors.request.eject(errorInterceptor);
    setErrorInterceptor(undefined);
  };

  useEffect(() => {
    // addAuthInterceptor();
    addErrorInterceptor();
    return () => {
    //   removeAuthInterceptor();
      removeErrorInterceptor();
    };
  }, []);

  return <React.Fragment />;
}

export default Interceptor;
