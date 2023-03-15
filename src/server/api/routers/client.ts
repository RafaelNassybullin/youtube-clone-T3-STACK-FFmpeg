import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import type { RandomData } from "@/interfaces";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import cookie from "cookie"
import { getJwtSecretKey } from "@/lib/auth";

export const clientRouter = createTRPCRouter({
  //получить карты с пагинацией
  getCards: publicProcedure
    .input(z.object({ skip: z.number().default(0), take: z.number().default(6) }))
    .query(({ ctx, input }) => {
      return ctx.prisma.video.findMany({
        skip: input.skip,
        take: input.take,
        orderBy: [{
          id: 'desc'
        }],
        select: {
          id: true,
          title: true,
          durationTime: true,
          videoUuidSlug: true,
          views: {
            select: {
              viewsCount: true,
            }
          },
          likes: {
            select: {
              likesCount: true
            }
          },
          thumbnailSprite: {
            select: {
              sprite: true
            }
          }
        },
      })
    }),
  //получить одно видео по id
  getVideo: publicProcedure.input(z.string().default("")).query(({ ctx, input }) => {
    return ctx.prisma.video.findUnique({
      where: {
        videoUuidSlug: input
      },
      select: {
        title: true,
        videoUrl: true,
        thumbnailSprite: {
          select: {
            sprite: true
          }
        }
      }
    })
  }),
  //получить количество всех видео
  getCardCount: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.video.count()
  }),
  //колличество видео в одной категории
  getCardCategoryCount: publicProcedure.input(z.object({ category: z.string().default("") })).query(({ ctx, input }) => {
    return ctx.prisma.category.findFirst({
      where: {
        name: input.category
      },
      select: {
        _count: {
          select: {
            video: true
          }
        }
      }
    })
  }),
  //получить карты по категории
  getCardByCategory: publicProcedure
    .input(z.object({
      skip: z.number().default(0),
      take: z.number().default(0),
      categoryName: z.string().default("")
    }))
    .query(({ ctx, input }) => {
      return ctx.prisma.category.findFirst({
        where: {
          name: input.categoryName
        },
        select: {
          video: {
            skip: input.skip,
            take: input.take,
            select: {
              id: true,
              title: true,
              durationTime: true,
              videoUuidSlug: true,
              views: {
                select: {
                  viewsCount: true
                }
              },
              likes: {
                select: {
                  likesCount: true
                }
              },
              thumbnailSprite: {
                select: {
                  sprite: true
                }
              }
            }
          }
        }
      })
    }),
  //получить рандомные видео
  getRandomCard: publicProcedure.input(z.string().default("")).query(({ ctx, input }) => {
    return ctx.prisma.$queryRaw<RandomData>` 
        SELECT 
          *
        FROM 
          video 
        INNER JOIN views
          ON views.videoId = video.id
        INNER JOIN likes
          ON likes.videoId = video.id
        INNER JOIN thumbnailSprite
          ON thumbnailSprite.videoId = video.id
        WHERE videoUuidSlug <> ${input}
        ORDER BY RANDOM() LIMIT 6 
    `
  }),
  getCategoryNames: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany({
      select: {
        id: true,
        name: true
      }
    })
  }),
  loginForm: publicProcedure
    .input(z.object({ login: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { res } = ctx
      if (process.env.ADMIN_LOGIN === input.login && process.env.ADMIN_PASSWORD === input.password) {
        const token = await new SignJWT({})
          .setProtectedHeader({ alg: "HS256" })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("10h")
          .sign(new TextEncoder().encode(getJwtSecretKey()));

        res.setHeader("Set-Cookie", cookie.serialize("user-token", token, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production"
        }))
        return { success: true }
      } else {
        return { success: false }
      }
    }),
  logOut: publicProcedure.mutation(({ ctx }) => {
    ctx.res.setHeader("Set-Cookie", cookie.serialize("user-token", "", {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production"
    }))
    return { loggedOut: true }
  }),
  viewCountUpdate: publicProcedure.input(z.object({ newCountValue: z.number(), viewsID: z.number() })).mutation(({ ctx, input }) => {
    return ctx.prisma.views.update({
      where: { videoId: input.viewsID },
      data: { viewsCount: `${input.newCountValue}` }
    })
  }),
  searchModel: publicProcedure.input(z.string().default("")).query(({ ctx, input }) => {
    return ctx.prisma.video.findMany({
      take: 21,
      where: {
        OR: [
          {
            title: {
              contains: input
            }
          },
          {
            description: {
              contains: input
            }
          }
        ]
      },
      orderBy: [{
        id: 'desc'
      }],
      select: {
        id: true,
        title: true,
        durationTime: true,
        videoUuidSlug: true,
        views: {
          select: {
            viewsCount: true,
          }
        },
        likes: {
          select: {
            likesCount: true
          }
        },
        thumbnailSprite: {
          select: {
            sprite: true
          }
        }
      },
    })
  })
});

