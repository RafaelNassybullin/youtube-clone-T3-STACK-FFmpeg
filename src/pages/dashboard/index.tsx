import { Montserrat } from "@next/font/google";
import { AdminNav } from "@/components/client/admin-nav";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: "900",
});

const Dashboards = () => {
  return (
    <div className={`${montserrat.className} relative flex pl-[230px] bg`}>
      <AdminNav />

      <div className=" grid h-[100vh] w-full place-items-center items-center text-center text-[125px] text-orange-300">
        Welcome To Admin Panel
      </div>
    </div>
  );
};

export default Dashboards;
