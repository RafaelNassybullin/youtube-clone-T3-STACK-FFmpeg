import { Montserrat } from "@next/font/google";
import { useState } from "react";
import { VideoCreateModal } from "@/components/client/video-create-modal";
import { VideoTable } from "@/components/client/video-table";
import { api } from "@/server/utils/api";
import { AdminNav } from "@/components/client/admin-nav";
import { AdminAddBtn } from "@/components/client/admin-add-btn";
import { Pagination } from "@/components/client/pagination";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: "900",
});

const Dashboards = () => {
  const [state, setState] = useState<number | null>(null);

  const { refetch, data: cards } = api.client.getCards.useQuery({
    skip: 0,
    take: 5,
  });

  const cardCount = api.client.getCardCount.useQuery();

  const [modalState, setModalState] = useState<boolean>(false);

  return (
    <div className={`${montserrat.className} relative flex pl-[230px] `}>
      <AdminNav param={"video"} />

      <div className="bg relative flex h-[100vh] w-full flex-col items-center">
        <AdminAddBtn modalOpen={() => setModalState(true)} param={"video"} />
        <div className="w-full  px-20">
          {cards ? (
            <>
              {cards.map((item) => (
                <VideoTable
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  refetching={() => refetch()}
                  image={item.thumbnailSprite?.sprite as string}
                  views={item?.views?.viewsCount as string}
                  duration={item.durationTime}
                  links={item.videoUuidSlug}
                  title={item.title}
                  key={item.id}
                  id={item.id}
                  delID={() => setState(item.id)}
                  delNull={() => setState(null)}
                  delState={state}
                />
              ))}
            </>
          ) : (
            <div className="grid h-[450px] w-full place-items-center text-[79px] text-orange-300">
              Загрузка...
            </div>
          )}
          <div
            className={`row absolute bottom-0 right-0 mt-[10px] flex w-full justify-center gap-4 py-[20px]`}
          >
            <Pagination
              firstPage="dashboard/video"
              itemsPerPage={5}
              link="dashboard/video/"
              currentPage={1}
              totalItems={cardCount.data ? cardCount.data : 0}
            />
          </div>
        </div>
      </div>
      {modalState ? (
        <VideoCreateModal
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          refetching={() => refetch()}
          close={() => setModalState(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboards;
