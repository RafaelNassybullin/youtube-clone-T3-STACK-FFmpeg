import { Montserrat } from "@next/font/google";
import { Logo } from "./logo";
import { NavSlider } from "./slider";
import { Search } from "./input";
import { api } from "@/server/utils/api";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: "900",
});

export const NavBar = () => {
  const categoryName = api.client.getCategoryNames.useQuery();

  return (
    <div className={montserrat.className}>
      <div className="parent-div w-full bg-[color:var(--color-dark-hard)]">
        <div className="row mx-auto flex h-[70px] w-full items-center justify-between bg-[color:var(--color-dark-hard)] p-4 2xl:container">
          <Logo links={"/"} />
          <Search />
        </div>
      </div>
      <NavSlider data={categoryName?.data ? categoryName?.data : []} />
    </div>
  );
};
