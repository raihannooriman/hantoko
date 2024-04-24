import { Dispatch, SetStateAction } from "react";

export type ToasterType = {
  toaster?: {
    message?: string;
    className?: string;
  };
  setToaster: Dispatch<SetStateAction<{}>>;
};
