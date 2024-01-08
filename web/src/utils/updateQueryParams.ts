import { History } from "history";

export const updateQueryParams = (
  query: string,
  router: History<unknown>,
  pathname: string
) => {
  if (window.history && window.history.replaceState) {
    let newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    if (query.trim().length > 0) {
      newurl += "?" + query;
    }
    newurl += window.location.hash;
    window.history.replaceState({ path: newurl }, "", newurl);
  } else {
    router.replace({
      pathname,
      search: query,
    });
  }
};
