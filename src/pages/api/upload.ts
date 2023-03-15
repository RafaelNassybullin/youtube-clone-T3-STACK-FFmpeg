import type { NextApiRequest, NextApiResponse } from "next";
import { parseForm, FormidableError } from "@/server/functions/upload-forms";
import type { File } from "formidable";
import { getDuration, getPoster } from "@/server/functions/video-duration";
import { prisma } from "@/server/data/db";
import { nanoid } from "nanoid";

interface FieldData {
  title: string,
  description: string,
  frameTime: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    });
    return;
  }

  try {
    const { files, fields } = await parseForm(req);

    const file = files.media;

    const { newFilename } = file as File;

    const url = ["/uploads/video/", newFilename].join("")

    const fieldsData = JSON.parse(fields.jsonData as string) as FieldData

    if (!url) {
      return res.status(400).json("FORBIDDEN ERROR 400");
    }

    const duration = await getDuration(url);

    const { title, description, frameTime } = fieldsData;

    const poster: string = await getPoster(url, Number(frameTime));

    const createVideo = await prisma.video.create({
      data: {
        title,
        videoUrl: url,
        description,
        durationTime: duration.time,
        videoUuidSlug: `${title.split(" ").join("-")}-${nanoid()}`,
        views: {
          create: {
            viewsCount: "0",
          },
        },
        likes: {
          create: {
            likesCount: "0",
          },
        },
        thumbnailSprite: {
          create: {
            sprite: poster,
          },
        },
      },
    });

    return res.status(200).json(createVideo);

  } catch (e) {
    if (e instanceof FormidableError) {
      res.status(e.httpCode || 400).json({ data: null, error: e.message });
    } else {
      console.error(e);
      res.status(500).json({ data: null, error: "Internal Server Error" });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;


