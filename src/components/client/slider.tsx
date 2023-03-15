import { Left } from "@/icon/left";
import { Right } from "@/icon/right";
import type { NavSliderCategory } from "@/interfaces";
import Link from "next/link";

interface NavSliderProps {
  data: NavSliderCategory[];
}

export const NavSlider = ({ data }: NavSliderProps) => {
  const left = () => {
    const slider = document.getElementById("slider");
    slider!.scrollLeft = slider!.scrollLeft - 300;
  };

  const right = () => {
    const slider = document.getElementById("slider");
    slider!.scrollLeft = slider!.scrollLeft + 300;
  };

  return (
    <div className="w-full bg-[color:var(--color-card-dark)]">
      <div className="row relative mx-auto flex h-[45px] w-full max-w-[1510px] items-center overflow-hidden bg-[color:var(--color-card-dark)]">
        <div
          onClick={left}
          className="l-0 absolute top-0 grid h-full w-[40px] cursor-pointer place-items-center bg-gradient-to-r from-[color:var(--color-card-dark)] to-[#00000000]"
        >
          <Left />
        </div>

        <div
          id="slider"
          className="row scroll flex place-items-center overflow-x-scroll scroll-smooth scrollbar-hide first:[&>.category]:ml-[40px]"
        >
          {data.map((item) => (
            <Link
              key={item.id}
              href={`/category/${item.name}`}
              className="category"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div
          onClick={right}
          className="absolute right-0 top-0 grid h-full w-[40px] cursor-pointer place-items-center bg-gradient-to-l from-[color:var(--color-card-dark)] to-[#00000000]"
        >
          <Right />
        </div>
      </div>
    </div>
  );
};
