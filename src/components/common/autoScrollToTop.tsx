import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function AutoScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default AutoScrollToTop;