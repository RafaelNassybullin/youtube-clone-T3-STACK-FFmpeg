import { Banner } from "@/components/client/banner";
import { VideoCard } from "@/components/client/card";
import { Footer } from "@/components/client/footer";
import { NavBar } from "@/components/client/navbar";
import { Pagination } from "@/components/client/pagination";
import { cardPerPage } from "@/config";
import { api } from "@/server/utils/api";
import { Montserrat } from "@next/font/google";
import { useRouter } from "next/router";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: "900",
});

export default function Сategory() {
  const { query } = useRouter();

  const card = api.client.getCardByCategory.useQuery({
    skip: 0,
    take: cardPerPage,
    categoryName: query.slug as string,
  });

  const { data: count } = api.client.getCardCategoryCount.useQuery({
    category: query.slug as string,
  });

  return (
    <>
      <NavBar />
      <Banner image={"/banner-test.jpeg"} />
      <div className={montserrat.className}>
        <main>
          {!card.data?.video ? (
            ""
          ) : (
            <div className="parent-div mx-auto grid grid-cols-1 gap-4 p-4 2xl:container lg:grid-cols-3">
              {card.data?.video.map((data) => (
                <VideoCard
                  key={data?.thumbnailSprite?.sprite as string}
                  image={data?.thumbnailSprite?.sprite as string}
                  slug={data.videoUuidSlug}
                  id={data.id}
                  likes={data?.likes?.likesCount as string}
                  views={data.views?.viewsCount as string}
                  title={data.title}
                  time={data.durationTime}
                />
              ))}
            </div>
          )}
        </main>

        <div
          className={`${montserrat.className} row mt-[30px] flex w-full justify-center gap-4`}
        >
          <Pagination
            firstPage={`category/${query.slug as string}/`}
            link={`category/${query.slug as string}/`}
            currentPage={1}
            totalItems={count?._count.video ? count._count.video : 0}
          />
        </div>
      </div>
      <Banner image={"/banner-test.jpeg"} />

      <Footer />
    </>
  );
}
