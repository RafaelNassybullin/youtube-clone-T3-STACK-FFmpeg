import type { NextApiRequest } from "next";
import mime from "mime";
import { join } from "path";
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (
  req: NextApiRequest
): Promise<{
  fields: formidable.Fields;
  files: formidable.Files
}> => {

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return await new Promise(async (resolve, reject) => {

    const uploadDir = join(
      process.env.ROOT_DIR || process.cwd(),
      `/public/uploads/video`
    );

    try {
      await stat(uploadDir);
    } catch (e: unknown | any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(e);
        reject(e);
        return;
      }
    }

    let filename = ""; //  To avoid duplicate upload

    const form = formidable({
      maxFiles: 1,
      maxFileSize: (1024 * 1024) * 200, // 200mb
      uploadDir,
      filename: (_name, _ext, part) => {
        if (filename !== "") {
          return filename;
        }

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        filename = `${part.name || "unknown"}-${uniqueSuffix}.${mime.getExtension(part.mimetype || "") || "unknown"}`;
        return filename;
      },
      filter: (part) => {
        return (
          part.name === "media" && (part.mimetype?.includes("video") || false)
        );
      },
    });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else {
        return resolve({ fields, files })
      }
    });
  });
};




