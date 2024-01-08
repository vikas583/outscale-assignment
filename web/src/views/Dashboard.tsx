
import React from "react";
import AdminUserScreenHeader from "../components/Headers/AdminUserScreenHeader";
// import { useAdminDashboard } from "../hooks/useAdminDashboard";
const Dashboard: React.FC = () => {
  // const { data, isLoading, isError } = useAdminDashboard();

  let content: JSX.Element | null = null;


  return (
    <>
      <AdminUserScreenHeader />
      {content}
    </>
  );
};

export default Dashboard;
