import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./components/layout";


function App() {
  const [isLoading] = useState(false);
  const { pathname } = useLocation()
  useEffect(() => {
      window.scrollTo(0, 0)

  }, [pathname])

  return (
    <div className="App">
      {isLoading ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="loading-text"></div>
        </div>
      ) : (
        <>
          <Navbar />
          <main>
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
