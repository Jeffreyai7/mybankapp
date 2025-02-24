import MobileNavBar from "@/components/MobileNavBar";
import SideBar from "@/components/SideBar";
import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = { firstName: "Jeffrey", lastName: "Irukeh" };
  return (
    <main className="flex h-screen w-full font-inter">
      <SideBar />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src={"/icons/logo.svg"} alt="logo" width={30} height={30} />
          <div>
            <MobileNavBar user={loggedIn} />
          </div>
        </div>

        {children}
      </div>
    </main>
  );
}
