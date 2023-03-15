import { join } from "path";
import { unlink } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/data/db";

const deleteFile = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  try {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const idForDelete = req.body.id

    const getVideoPoster = await prisma.video.findUnique({
      where: { id: idForDelete as number },
      select: {
        thumbnailSprite: {
          select: {
            sprite: true
          }
        }
      }
    });

    let deleteVideo = await prisma.video.update({
      where: { id: idForDelete as number },
      data: {
        views: { delete: true },
        likes: { delete: true },
        thumbnailSprite: { delete: true },
      }
    });

    deleteVideo = await prisma.video.delete({
      where: { id: deleteVideo.id },
    })

    const posterUrl = getVideoPoster?.thumbnailSprite?.sprite

    const videoUrl = deleteVideo.videoUrl

    //filePathJoiner

    const video = join(
      process.env.ROOT_DIR || process.cwd(),
      `public${videoUrl}`
    );

    const poster = join(
      process.env.ROOT_DIR || process.cwd(),
      `public${posterUrl as string}`
    );

    //if videoUrl && posterUrl is empty we dont delete.
    if (videoUrl && posterUrl) {
      unlink(poster, err => console.log(err))
      unlink(video, err => console.log(err))
    }

    return res.status(200).json("success");

  } catch {
    return res.status(200).json("error");
  }
};

export default deleteFile;