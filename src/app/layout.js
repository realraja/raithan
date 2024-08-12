import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/redux/store/StoreProvider";
import StartUp from "@/StartUp/StartUp";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Raithan Classes",
  description: "Let's get selection with raithan classes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <link rel="icon" href="./favicon.ico" sizes="any" />
      <body className={inter.className}>
        <StoreProvider>
          <div className="h-[100vh] w-[100vw] overflow-auto scrollEditclass text-white  z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
            <Toaster toastOptions={{ duration: 4000 }} />
            <StartUp>        
              <div className="max-sm:pb-14">    
            {children}
            </div> 
            </StartUp>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
