import "../styles/globals.css";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff").then((liff) => {
      console.log("start liff.init()...");
      liff
        .init({ 
          liffId: process.env.LIFF_ID,
          withLoginOnExternalBrowser: true
         })
        .then(() => {
          console.log("liff.init() done");
          setLiffObject(liff);
          console.log(liff.getLanguage());
          console.log(liff.getVersion());
          console.log(liff.isInClient());
          console.log(liff.isLoggedIn());
          
          console.log(liff.getOS());
          console.log(liff.getLineVersion());
          if (!liff.isLoggedIn() && !liff.isInClient()) {
            
            window.alert('To get an access token, you need to be logged in. Tap the "login" button below and try again.');
        } else {
            const profile = liff.getProfile();
            const accessToken = liff.getAccessToken();
            const idToken = liff.getIDToken();
            console.log(idToken);
            console.log(accessToken);
            console.log(profile);
            
        }
        })
        .catch((error) => {
          console.log(`liff.init() failed: ${error}`);
          if (!process.env.liffId) {
            console.info(
              "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
            );
          }
          setLiffError(error.toString());
        });
    });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
