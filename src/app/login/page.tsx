import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";
import Image from "next/image";
import Login from "./Login";

export const metadata: Metadata = {
  title: "Login",
};

export default function LogInPage() {
  return (
    <>
      <Breadcrumb pageName="Login" />

      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <Login />
            </div>
          </div>

          <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
              <div className="mb-10 inline-block h-8 max-w-[10.847rem]">
                <span className="text-3xl font-semibold text-gray-900 dark:text-white">
                  TogetherSafe
                </span>
              </div>
              <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                Masuk dengan akun Admin
              </p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                Selamat Datang!
              </h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                Silakan masuk ke akun Anda dengan mengisi kolom yang diperlukan
                di samping
              </p>

              <div className="mt-31">
                <Image
                  src={"/images/grids/grid-02.svg"}
                  alt="Logo"
                  width={405}
                  height={325}
                  className="mx-auto dark:opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
