import { adminLinks } from "@/config";
import { api } from "@/server/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { Logo } from "./logo";

export const AdminNav = ({ param }: { param?: string }) => {
  const router = useRouter();

  const { mutate: logOut } = api.client.logOut.useMutation({
    onSuccess: () => {
      router.push("/admin").catch(() => console.log("redirect error"));
    },
  });

  return (
    <div className="fixed top-0 left-0">
      <div
        className={`relative flex h-[100vh] w-[230px] min-w-[230px] flex-col items-center bg-black py-[25px]`}
      >
        <div className="mb-[80px]">
          <Logo links={`/dashboard`} />
        </div>

        {adminLinks.map((item) => (
          <Link key={item} href={`/dashboard/${item}`} className="mb-[15px]">
            <div
              className={`category h-[40px] w-[170px] ${
                param === item
                  ? "border-none bg-[color:var(--color-text-orange)] text-[color:var(--color-just-white)] hover:text-[color:var(--color-just-white)]"
                  : ""
              } px-5 text-3xl`}
            >
              {item}
            </div>
          </Link>
        ))}

        <div
          onClick={() => logOut()}
          className="absolute bottom-[15px] left-[50%] translate-x-[-50%] cursor-pointer rounded-[10px] bg-red-500 px-4 py-1 text-2xl text-white hover:bg-opacity-80"
        >
          LogOut
        </div>
      </div>
    </div>
  );
};
