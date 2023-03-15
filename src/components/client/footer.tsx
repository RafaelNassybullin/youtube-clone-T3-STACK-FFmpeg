import { Logo } from "./logo";
import { Montserrat } from "@next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: "900",
});

export const Footer = () => {
  return (
    <div
      className={`${montserrat.className} row mt-[90px] flex h-[350px] w-full justify-center bg-[color:var(--color-dark-hard)] p-[40px]`}
    >
      <Logo links="/" />
    </div>
  );
};
