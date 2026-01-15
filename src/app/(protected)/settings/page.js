import React from "react";
import Profile from "@/components/Shared/Settings/Profile/page";
import Settings from "@/components/Shared/Settings/page";
const page = () => {
  return (
<div className="grid grid-cols-12 min-h-screen bg-gray-50 gap-2">
<div className="col-span-1 bg-red-500 ">

  </div>
  <div className="col-span-2 bg-red-500 ">
    <Profile />
  </div>

  <div className="col-span-8 bg-yellow-500">
    <Settings />
  </div>
  <div className="col-span-1 bg-red-500 ">

</div>
</div>

  );
};

export default page;
