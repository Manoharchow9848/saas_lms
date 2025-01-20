import React from "react";
import SideBar from "./_components/SideBar";
import DashBoardHeader from "./_components/DashBoardHeader";

function DashBoardLayout({ children }) {
  return (
    <div>
      <div className="md:w-64 hidden md:block fixed">
        <SideBar />
      </div>
      <div className="md:ml-64">
        <DashBoardHeader />
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}

export default DashBoardLayout;
