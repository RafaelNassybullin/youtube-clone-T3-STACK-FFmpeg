import { NavBar } from "@/components/client/navbar";
import { useEffect, useState } from "react";
import { Banner } from "@/components/client/banner";
import { useRouter } from "next/router";
import { api } from "@/server/utils/api";
import { VideoCard } from "@/components/client/card";
import { Footer } from "@/components/client/footer";

export default function Search() {
  const [rnd, setRnd] = useState(0);
  const { query } = useRouter();

  const { data: searchData } = api.client.searchModel.useQuery(
    query.slug as string
  );

  // console.log(searchData);

  const sorry = [
    "Экскюзмуа",
    "Мискузи",
    "Проститя",
    "Сорянчик",
    "Арбайтен",
    "Ахтунг",
    "Ойбой",
  ];

  useEffect(() => {
    setRnd(Math.floor(Math.random() * sorry.length) + 0);
  }, [sorry.length]);

  return (
    <>

      <main className={`bg-black`}>
        <NavBar />

        <Banner image={"/banner-test.jpeg"} />

        {!searchData?.length ? (
          <>
            <h1 className="text-center text-[120px] text-[var(--color-text-orange)]">
              {sorry[rnd]}!
            </h1>
            <h2 className="text-center text-[105px] text-[var(--color-text-orange)]">
              Ничего не найдено!
            </h2>
          </>
        ) : (
          <div className="parent-div mx-auto grid grid-cols-1 gap-4 p-4 2xl:container lg:grid-cols-3">
            {searchData.map((data) => (
              <VideoCard
                key={data?.thumbnailSprite?.sprite as string}
                id={data?.id}
                image={data?.thumbnailSprite?.sprite as string}
                slug={data.videoUuidSlug}
                likes={data?.likes?.likesCount as string}
                views={data.views?.viewsCount as string}
                title={data.title}
                time={data.durationTime}
              />
            ))}
          </div>
        )}
      </main>
      <Banner image={"/banner-test.jpeg"} />

      <Footer />
    </>
  );
}
