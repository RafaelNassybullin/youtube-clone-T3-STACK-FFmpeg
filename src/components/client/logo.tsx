import { NameLogo } from "@/config";
import Link from "next/link";

type LogoTypes = {
  links: string;
};

export const Logo = ({ links }: LogoTypes) => {
  return (
    <Link href={links}>
      <div className="grid h-[45px] w-[190px] cursor-pointer place-items-center rounded-[10px] bg-[var(--color-logo-orange)] text-[color:var(--color-just-white)]">
        <h1 className="text-[37px] leading-3">{NameLogo}</h1>
      </div>
    </Link>
  );
};
