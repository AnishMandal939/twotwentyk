import { ProSidebarProvider } from "react-pro-sidebar";
import { Outlet } from "react-router-dom";

export default function CreditControlDashboard() {


  return (
    <>
      
      <ProSidebarProvider>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
          }}
          className="element-hide"
        >
          <div
            style={{
              width: "100%",
              position: "sticky",
              top: "0",
              overflowY: "auto",
            }}
            className="hide_overflow_width"
          >
            <Outlet />
          </div>
        </div>
      </ProSidebarProvider>
    </>
  );
}
