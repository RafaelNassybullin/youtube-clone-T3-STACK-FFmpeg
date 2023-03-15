import React, { useRef, useState } from "react";
import axios from "axios";
import type { AxiosProgressEvent } from "axios";
import type { AxiosRequestConfig } from "axios";
import type { ChangeEvent, MouseEvent } from "react";

interface ModalProps {
  close: () => void;
  refetching: () => void;
}

export const VideoCreateModal = ({ close, refetching }: ModalProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const vRef = useRef<HTMLVideoElement>(null);
  const [curTime, setVideoCurrentTime] = useState(0);

  const onTimeUpdate = () => {
    const ref = vRef.current;
    if (ref) {
      const videoDuration: number = ref.currentTime;
      setVideoCurrentTime(videoDuration);
    }
  };

  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      alert("No file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }

    const file = fileInput.files[0];

    if (!file?.type.startsWith("video")) {
      alert("Please select a valide image");
      return;
    }

    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const onCancelFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFile(null);
    setPreviewUrl(null);
    setDescription("");
    setTitle("");
    close();
    setProgress(0);
  };

  const onUploadFile = async (e: MouseEvent) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    if (!title.trim()) {
      return;
    }

    if (!description.trim()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("media", file);
      formData.append(
        "jsonData",
        JSON.stringify({
          title,
          description,
          frameTime: `${Math.round(curTime * 1000)}`,
        })
      );

      const options: AxiosRequestConfig = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const { loaded, total } = progressEvent;

          if (total === undefined) {
            return;
          }

          const percentage = (loaded * 100) / total;
          setProgress(+percentage.toFixed(2));
        },
      };
      await axios
        .post("/api/upload", formData, options)
        .then(() => refetching());
    } catch {
      console.error(e);
      const error = "Sorry! something went wrong.";
      alert(error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 grid h-full w-full place-items-center backdrop-blur ">
        <div className="relative h-[490px] w-[840px] rounded-[10px] border-2 border-dashed border-[color:var(--color-text-gray)] bg-[color:var(--color-card-dark)] p-[45px] text-white">
          {progress < 1 || progress > 99 ? (
            <div
              onClick={onCancelFile as () => void}
              className="absolute top-3.5 right-5 cursor-pointer text-[16px] text-white hover:text-[color:var(--color-text-orange)]"
            >
              close
            </div>
          ) : (
            ""
          )}

          <div className="h-[45px] w-full rounded-[5px] bg-[#373332]">
            <input
              className="h-full w-full rounded-lg border-2 border-dashed border-[color:var(--color-text-gray)] bg-transparent px-4 text-2xl  text-[color:var(--color-text-orange)] outline-none placeholder:text-[color:var(--color-text-gray)] focus:border-[color:var(--color-text-orange)] focus:bg-[color:var(--color-dark-hard)]"
              type="text"
              disabled={progress > 99}
              placeholder="Type card name..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="my-[15px] flex w-full justify-between">
            <div className="h-[240px] w-[40%] rounded-[5px] ">
              <div className="flex h-full w-full items-center justify-center">
                <label
                  htmlFor="dropzone-file"
                  className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-[color:var(--color-text-gray)] hover:bg-gray-100 hover:text-[color:var(--color-text-orange)] dark:border-[color:var(--color-text-gray)] dark:bg-[#373332] dark:hover:border-[color:var(--color-text-orange)] dark:hover:bg-[color:var(--color-dark-hard)] dark:hover:bg-opacity-50"
                >
                  <div className="flex flex-col items-center justify-center overflow-hidden ">
                    {!file?.name ? (
                      <>
                        <svg
                          aria-hidden="true"
                          className="mb-3 h-10 w-10 "
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                    {!file?.name ? (
                      <p className="text-xs">video files .mp4 .avi .mov</p>
                    ) : (
                      ""
                    )}
                  </div>

                  {!file?.name ? (
                    <>
                      <input
                        id="dropzone-file"
                        disabled={progress > 99}
                        type="file"
                        className="hidden"
                        onChange={onFileUploadChange}
                      />
                    </>
                  ) : (
                    <>
                      <video
                        ref={vRef}
                        onTimeUpdate={onTimeUpdate}
                        className="h-[236px] w-full object-cover"
                        muted
                        src={previewUrl as string}
                        controls
                      ></video>
                    </>
                  )}
                </label>
              </div>
            </div>
            <div className="h-[240px] w-[58%] rounded-[5px] bg-[#373332]">
              <textarea
                disabled={progress > 99}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Type description..."
                className="h-full w-full resize-none rounded-lg border-2 border-dashed border-[color:var(--color-text-gray)] bg-transparent p-2 text-[color:var(--color-text-orange)] outline-none placeholder:text-[color:var(--color-text-gray)] focus:border-[color:var(--color-text-orange)] focus:bg-[color:var(--color-dark-hard)]"
                name="description"
                id="textarea"
              ></textarea>
            </div>
          </div>
          <div className="grid h-[48px] w-full place-items-center rounded-[5px] bg-[#373332] text-white">
            Category
          </div>
          {progress > 1 ? (
            <div
              style={{ width: `${progress}` }}
              className={`mt-[15px] grid h-[40px] place-items-center rounded-full ${
                progress > 99
                  ? "bg-green-400"
                  : "bg-[color:var(--color-text-orange)]"
              }  text-2xl`}
            >
              {progress > 99 ? "Uploading success!" : <>{progress}%</>}
            </div>
          ) : (
            ""
          )}
          {progress < 1 ? (
            <div className="flex w-full justify-center">
              <div
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={onUploadFile}
                className="mt-[15px] h-fit w-fit cursor-pointer rounded-[10px] border-[1px] border-[color:var(--color-text-orange)] bg-[color:var(--color-card-dark)] px-4 py-2 text-center text-2xl capitalize text-[color:var(--color-text-orange)] hover:bg-[color:var(--color-dark-middle)]"
              >
                Submit
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
