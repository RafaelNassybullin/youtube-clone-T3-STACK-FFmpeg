import { join } from "path";
import getVideoDurationInSeconds from "get-video-duration";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import extractFrame from 'ffmpeg-extract-frame'
import prettyMilliseconds from "pretty-ms";
import { nanoid } from "nanoid";

export async function getDuration(videoPlace: string) {
  const path = join(
    process.env.ROOT_DIR || process.cwd(),
    `public${videoPlace}`
  );
  const duration = await getVideoDurationInSeconds(path);
  const toMilliseconds = prettyMilliseconds(+duration.toFixed() * 1000, {
    colonNotation: true,
  });
  return { time: toMilliseconds }
}

export async function getPoster(videoPlace: string, msTime: number) {

  const fileName = `/uploads/image/${nanoid()}.jpg`

  const video = join(
    process.env.ROOT_DIR || process.cwd(),
    `public${videoPlace}`
  );

  const sprite = join(
    process.env.ROOT_DIR || process.cwd(),
    `public${fileName}`
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  await extractFrame({
    input: video,
    output: sprite,
    offset: msTime, // seek offset in milliseconds

  })

  return fileName
}

