import { NavBar } from "@/components/client/navbar";
import { Montserrat } from "@next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: "900",
});

export default function ErrorPage() {
  return (
    <>
      <NavBar />
      <div className={montserrat.className}>
        <h2 className="text-center text-[105px] text-[var(--color-text-orange)]">
          Этой страницы
        </h2>
        <h2 className="text-center text-[105px] text-[var(--color-text-orange)]">
          не существует!
        </h2>
      </div>
    </>
  );
}
