export const VideoCardPreview = ({ img }: any) => {
  return (
    <>
      <img
        className="h-full w-full object-cover"
        src={img}
        alt=""
      />
    </>
  );
};
