import DataTabs from "./(components)/DataTabs";
import Overview from "./(components)/Overview";
import RecentDrives from "./(components)/RecentDrives";

export default async function Home() {
  return (
    <div className="h-screen m-10 bg-third p-5 rounded-lg shadow-xl">
      <div className="text-4xl font-bold ml-2 mb-8">Dashboard</div>
      <div className="flex flex-col  justify-normal ">
        <div className="mb-8">
          <DataTabs />
          </div>
        <div className="flex">
          <Overview />
          <RecentDrives />
        </div>
      </div>
    </div>
  );
}
