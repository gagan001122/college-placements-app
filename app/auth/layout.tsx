"use client";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  FaLayerGroup,
  FaPlus,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import {MdGroups2} from 'react-icons/md'
import {ImProfile} from 'react-icons/im'
import { RedirectType } from "next/dist/client/components/redirect";
function SideBarIcon({ icon, text, selectedProp }: any) {
  return (
    <div
      className={`relative flex items-center justify-center
      ${
        selectedProp
          ? "bg-third text-secondary rounded-xl"
          : "bg-secondary text-third rounded-3xl"
      }
      h-12 my-3 w-12 mx-auto shadow-xl 
      hover:rounded-xl hover:bg-third hover:text-secondary
      transition-all duration-300 cursor-pointer group`}
    >
      {icon}
      <span
        className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
    text-white bg-gray-900 
    text-xs font-bold 
    transition-all duration-100 scale-0 origin-center group-hover:scale-100"
      >
        {text}
      </span>
    </div>
  );
}

let icons = [
  [<FaHome key={0} size="22" />, "Home", "home"],
  [<FaPlus key={1} size="22" />, "Create Drive", "create"],
  [<FaLayerGroup key={2} size="22" />, "Drives", "drives"],
  [<MdGroups2 key={4} size='22'/>, "Students", "students"],
  [<ImProfile key={3} size="22" />, "Profile", "profile"],
  [
    <FaSignOutAlt key={4} size="22" />,
    "Logout",
    "logout",
    () => {
      signOut({ callbackUrl: "/" });
    },
  ],
];
function setValidId(path: string, setId: any) {
  if (path.includes("home")) setId(0);
  else if (path.includes("create")) setId(1);
  else if (path.includes("drives")) setId(2);
  else if (path.includes("students")) setId(3);
  else if (path.includes("profile")) setId(4);
}
function SideBar() {
  const [id, setId] = useState<number>();
  const pathname = usePathname();
  if (id == undefined) {
    setValidId(pathname, setId);
  }
  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 m-0
        flex flex-col bg-black shadow-sm shadow-white 
        "
    >
      {icons.map((ele: any, idx) => {
        return (
          <Link
            href={`/auth/${ele[2]}`}
            key={idx}
            onClick={(e) => {
              if (ele.length == 4) {
                e.preventDefault();
                ele[3]();
              }
              setId(idx);
            }}
          >
            <SideBarIcon icon={ele[0]} text={ele[1]} selectedProp={id == idx} />
          </Link>
        );
      })}
    </div>
  );
}
export default function SideBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  if (status == "loading") {
    return <div>Loading...</div>;
  }
  if (status == "unauthenticated") {
    redirect("/", RedirectType.replace);
  } else {
    return (
      <div className="flex flex-col pl-16 h-screen overflow-auto w-auto bg-gray-200">
        <SideBar />
        {children}
      </div>
    );
  }
}
