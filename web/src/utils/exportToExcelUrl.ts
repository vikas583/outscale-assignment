import qs from "query-string";

export const exportToExcelUrl = (
  executionId: number | string,
  chemicalId?: number | string
) => {
  const query: Record<string, string> = {
    token: localStorage.getItem("token") || "",
  };

  if (chemicalId) {
    query.chemicalId = `${chemicalId}`;
  }

  return `${
    process.env.REACT_APP_API_BASE_URL
  }/execution/export/${executionId}?${qs.stringify(query)}`;
};
