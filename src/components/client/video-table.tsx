import { Eye } from "@/icon/eye";
import axios from "axios";
import Link from "next/link";

export const VideoTable = ({
  id,
  delNull,
  delID,
  delState,
  links,
  views,
  duration,
  image,
  refetching,
  title,
}: {
  id: number;
  delNull: () => void;
  delID: () => void;
  links: string;
  views: string;
  duration: string;
  delState: number | null;
  refetching: () => void;
  image: string;
  title: string;
}) => {
  const h = () => {
    if (id === delState) {
      delNull();
    } else {
      delID();
    }
  };

  const deleteHandler = async () => {
    await axios
      .delete("/api/deleteFile", { data: { id } })
      .then(() => refetching());
  };

  return (
    <>
      <div className="row mx-auto mb-[10px] flex h-[90px] w-[700px] overflow-hidden rounded-[10px] border-[1px] border-dashed border-[color:var(--color-text-orange)] backdrop-blur-sm">
        <Link
          // target={"_blank"}
          href={`/video/${links}`}
          className="relative h-full w-[180px] cursor-pointer text-[12px]"
        >
          <img className="h-full w-full object-cover" src={image} alt="" />
          <div className="absolute flex row items-center rounded left-0 bottom-0 bg-black py-[2px] px-[3px] text-white">
          <Eye weight="w-4" height="h-4" color="text-white"/> <span className="ml-[3px]">{views}</span>
          </div>
          <div className="absolute rounded right-0 bottom-0 bg-black py-[1px] px-[3px] text-white">
            {duration}
          </div>
        </Link>
        <div
          onClick={() => delNull()}
          className="row flex h-full w-[430px] items-center overflow-hidden border-[1px] border-dashed border-transparent  border-r-[color:var(--color-text-orange)] p-3 text-white"
        >
          {title}
        </div>

        <div className={"relative grid h-full w-[90px] place-items-center "}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon h-10 w-10 cursor-pointer text-[color:var(--color-text-orange)]"
            viewBox="0 0 512 512"
            onClick={h}
          >
            <path
              d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
              d="M80 112h352"
            />
            <path
              d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
          </svg>

          <div
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={deleteHandler}
            className={`absolute top-0 left-0 grid h-full w-[90px] transition-transform ${
              id !== delState ? "translate-x-[100%]" : "translate-x-[0]"
            } cursor-pointer place-items-center bg-red-500 text-xl text-white`}
          >
            Delete
          </div>
        </div>
      </div>
    </>
  );
};
