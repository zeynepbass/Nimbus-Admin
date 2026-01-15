import React from "react";
import Profile from "@/components/Shared/Settings/Profile/page";
import Settings from "@/components/Shared/Settings/page";
const page = () => {
  return (
<div className="grid grid-cols-12 min-h-screen bg-gray-50 gap-2">
<div className="col-span-1 ">

  </div>
  <div className="col-span-2 "style={{height:"50vh"}}>

    <Profile />
  </div>

  <div className="col-span-8 rounded-lg min-h-screen">
    <Settings />
  </div>
  <div className="col-span-1 ">

</div>
</div>

  );
};

export default page;
