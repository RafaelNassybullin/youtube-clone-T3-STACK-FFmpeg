import Link from "next/link";
import { Montserrat } from "@next/font/google";
import { Like } from "@/icon/like";
import { Eye } from "@/icon/eye";
import { VideoCardPreview } from "./preview";
import { api } from "@/server/utils/api";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: "400",
});

interface VideoCardProps {
  image: string;
  slug: string;
  likes: string;
  views: string;
  title: string;
  time: string;
  id: number;
}

export const VideoCard = ({
  image,
  slug,
  likes,
  views,
  title,
  time,
  id,
}: VideoCardProps) => {
  const { mutate: incrementViews } = api.client.viewCountUpdate.useMutation();

  const viewsIncrementor = () => {
    incrementViews({ newCountValue: Number(views) + 1, viewsID: id });
  };

  return (
    <Link
      onClick={viewsIncrementor}
      className={
        montserrat.className +
        " " +
        "card w-full cursor-pointer overflow-hidden rounded-[10px] bg-[color:var(--color-card-dark)]"
      }
      href={`/video/${slug}`}
    >
      <div className="relative h-[250px] w-full">
        <VideoCardPreview img={image} />
        <div className="row absolute top-4 left-4 flex w-fit items-center gap-2 rounded-[5px] bg-[color:var(--color-like-green)] bg-opacity-80 px-2 text-lg text-[color:var(--color-just-white)]">
          <Like />
          {likes}%
        </div>
        <div className="row absolute bottom-4 left-4 flex w-fit items-center gap-2 rounded-[5px] bg-[color:var(--color-card-dark)] bg-opacity-80 px-2 text-lg text-[color:var(--color-just-white)]">
          <Eye />
          {views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
        </div>
        <div className="absolute bottom-4 right-4 w-fit rounded-[5px] bg-[color:var(--color-card-dark)] bg-opacity-80 px-2 text-lg text-[color:var(--color-just-white)]">
          {time}
        </div>
      </div>
      <div className="py-2 px-3 text-xl">
        <p className="text-[color:var(--color-text-orange)]">{title}</p>
      </div>
    </Link>
  );
};
