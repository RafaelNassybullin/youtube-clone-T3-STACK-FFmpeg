import { getVideoDurationInSeconds } from "get-video-duration";
import prettyMilliseconds from "pretty-ms";

export function kjnjnj(video) {
  const j = {
    time: "",
  };
  getVideoDurationInSeconds(video)
    .then((duration) => {
      const result = prettyMilliseconds(duration.toFixed() * 1000, {
        colonNotation: true,
      });
      j.time = result;
    })
    .then(() => {
      console.log(j);
    });

  return j;
}
