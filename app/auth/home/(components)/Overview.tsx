import React from "react";
import LineGraph from "./LineGraph";
import prisma from "@/prisma/PrismaClient";

const getGraphData = async () => {
  const monthlyDrives = await prisma.placementDrive.groupBy({
    by: ["created_at"],
    _count: {
      created_at: true,
    },
  });

  var _data : {months : any}  = {
    months: {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    },
  };


  for (const drive of monthlyDrives) {
    const month: string = new Date(drive.created_at).toLocaleString("en-us", {
      month: "long",
    });
    _data.months[month]++;
    // data.count.push(drive._count.created_at);
  }
  return _data;
};

async function Overview() {
  let data = await getGraphData();
  return (
    <div className="border rounded-md w-1/2 p-2 m-2 h-[50vh] shadow-md">
      <div className="ml-2 text-xl mb-2 font-bold">Overview</div>
      <div>
        <LineGraph data={data} />
      </div>
    </div>
  );
}

export default Overview;
