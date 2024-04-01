import { Dispatch, SetStateAction } from "react";

type Proptypes = {
  uploadedImage: File | null;
  name: string;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
};
const InputFile = (props: Proptypes) => {
  const { uploadedImage, setUploadedImage, name } = props;
  return (
    <div className="">
      <label
        className="mt-2 bg-[#eee] flex flex-col items-center justify-center text-center gap-5 p-5 cursor-pointer rounded-lg float-left w-full mb-5"
        htmlFor={name}
      >
        {uploadedImage?.name ? (
          <p>{uploadedImage.name}</p>
        ) : (
          <>
            <p>Upload a new image</p>
          </>
        )}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={(e: any) => {
          e.preventDefault();
          setUploadedImage(e.currentTarget.files[0]);
        }}
        className="absolute opacity-0 -z-[1]"
      />
    </div>
  );
};
export default InputFile;
