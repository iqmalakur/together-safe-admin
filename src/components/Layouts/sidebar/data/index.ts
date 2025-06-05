import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Insiden",
        url: "/incidents",
        icon: Icons.ExclamationIcon,
        items: [],
      },
      {
        title: "Laporan Insiden",
        url: "/reports",
        icon: Icons.ReportIcon,
        items: [],
      },
      {
        title: "Logout",
        url: "/logout",
        icon: Icons.Authentication,
        items: [],
      },
    ],
  },
];
