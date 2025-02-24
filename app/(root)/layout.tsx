import SideBar from "@/components/SideBar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = { firstName: "Jeffrey", lastName: "Irukeh" };
  return (
    <main className="flex h-screen w-full font-inter">
      <SideBar />

      {children}
    </main>
  );
}
