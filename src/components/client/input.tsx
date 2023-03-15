import { SearchIcon } from "@/icon/search";
import { useRouter } from "next/router";
import { useState } from "react";

export const Search = () => {
  const [state, setState] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);
  const router = useRouter();

  const charTypeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const runSearchHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (state.trim() && router.pathname !== "/search/[slug]") {
        router
          .push(`/search/${state}`)
          .catch(() => console.log("error to redirect from NOSEARCH route"));
      } else if (state.trim() && router.pathname === "/search/[slug]") {
        router
          .push(`/search/${state}`)
          .then(() => {
            router.reload();
          })
          .catch(() => console.log("error to redirect from SEARCH route"));
      }
    }
  };

  return (
    <>
      <div
        className={`row flex h-[42px] w-[468px] items-center overflow-hidden rounded-[10px] border-[1px] bg-[color:var(--color-dark-middle)] ${
          focus
            ? "border-[color:var(--color-text-orange)]"
            : "border-[color:var(--color-dark-middle)]"
        }`}
      >
        <SearchIcon changeColor={state} />
        <input
          className="w-full bg-inherit text-[22px] text-[color:var(--color-text-orange)] placeholder-[color:var(--color-text-gray)] outline-none"
          type="text"
          value={state}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onKeyDown={runSearchHandler}
          onChange={charTypeHandler}
          placeholder="Поиск..."
        />
      </div>
    </>
  );
};
