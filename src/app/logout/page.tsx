import { Metadata } from "next";
import Logout from "./Logout";

export const metadata: Metadata = {
  title: "Logout",
};

export default async function LogoutPage() {
  return <Logout />;
}
