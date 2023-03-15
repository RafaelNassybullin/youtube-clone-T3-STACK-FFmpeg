import { Eye } from "@/icon/eye";
import { api } from "@/server/utils/api";
import { Montserrat } from "@next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: "900",
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: loginMutate } = api.client.loginForm.useMutation({
    onSuccess: () => {
      router.push("/dashboard").catch(() => console.log("redirect error"));
    },
  });

  const loginHandler = (e: MouseEvent) => {
    e.preventDefault();
    console.log({ login, password });
    loginMutate({ login, password });
  };

  return (
    <div
      className={`${montserrat.className} bg grid h-[100vh] w-full place-items-center text-3xl`}
    >
      <form
        autoComplete="off"
        className="flex h-[380px] w-[520px] flex-col justify-center rounded-[10px] border-2 border-dashed border-[color:var(--color-text-orange)] p-[49px] backdrop-blur-sm"
      >
        <h2 className="mb-[20px] text-center text-[color:var(--color-text-orange)]">
          Admin Login
        </h2>
        <input
          name="video-login"
          value={login.trim()}
          onChange={(e) => setLogin(e.target.value)}
          className="h-16 rounded-[7px] border-2 border-dashed border-[color:var(--color-text-orange)] bg-[color:var(--color-dark-middle)] px-[15px] text-[color:var(--color-text-orange)] outline-none"
          type="text"
          placeholder="Login. . ."
        />
        <div className="relative mt-[20px] h-16 w-full overflow-hidden rounded-[7px] border-2 border-dashed border-[color:var(--color-text-orange)] text-[color:var(--color-text-orange)]">
          <input
            name="video-password"
            value={password.trim()}
            onChange={(e) => setPassword(e.target.value)}
            className="h-full w-full bg-[color:var(--color-dark-middle)] px-[15px]  outline-none autofill:bg-slate-500"
            type={showPassword ? "text" : "password"}
            placeholder="Password. . ."
          />

          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-0 right-0 grid h-full w-[49px] cursor-pointer place-items-center bg-[color:var(--color-dark-middle)]"
          >
            <Eye
              weight="w-7"
              height="w-7"
              color={
                !showPassword
                  ? "text-[color:var(--color-text-gray)]"
                  : "text-[color:var(--color-text-orange)]"
              }
            />
          </div>
        </div>

        <button
          disabled={login.trim() && password.trim() ? false : true}
          onClick={loginHandler as () => void}
          className={`mt-[20px] h-16 ${
            login.trim() && password.trim()
              ? "hover:border-white hover:bg-red-500 hover:text-white"
              : ""
          }  rounded-[7px] border-2 border-dashed border-[color:var(--color-text-orange)] bg-[color:var(--color-dark-middle)] px-[15px] text-[color:var(--color-text-orange)] outline-none`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
