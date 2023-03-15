import { Banner } from "@/components/client/banner";
import { VideoCard } from "@/components/client/card";
import { Footer } from "@/components/client/footer";
import { NavBar } from "@/components/client/navbar";
import type { RandomData } from "@/interfaces";
import { api } from "@/server/utils/api";
import { Montserrat } from "@next/font/google";
import { useRouter } from "next/router";
import React from "react";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: "900",
});

function VideoPage() {
  const { query } = useRouter();

  const video = api.client.getVideo.useQuery(query.slug as string);
  const cards = api.client.getRandomCard.useQuery(query.slug as string, {
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <NavBar />
      <Banner image={"/banner-test.jpeg"} />
      <div className="mx-auto p-4 2xl:container">
        <iframe
          src={`/playerjs.html?file=${
            video.data?.videoUrl ? video.data?.videoUrl : ""
          }&poster=${
            video.data?.thumbnailSprite?.sprite
              ? video.data?.thumbnailSprite.sprite
              : ""
          }`}
          width="100%"
          height="700px"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        {/* <video src="" onTimeUpdate={}></video> */}
        {!video.data ? (
          ""
        ) : (
          <h2
            className={
              montserrat.className + " " + "mx-4 my-5 text-5xl text-white"
            }
          >
            {video?.data.title}
          </h2>
        )}
        <main>
          {!cards.data ? (
            ""
          ) : (
            <div className="parent-div mx-auto grid grid-cols-1 gap-4 p-4 2xl:container lg:grid-cols-3">
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-call */}
              {cards.data.map((datas: RandomData) => (
                <VideoCard
                  key={datas?.sprite}
                  image={datas?.sprite}
                  id={datas?.videoId}
                  slug={datas.videoUuidSlug}
                  likes={datas.likesCount}
                  views={datas.viewsCount}
                  title={datas.title}
                  time={datas.durationTime}
                />
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default VideoPage;
