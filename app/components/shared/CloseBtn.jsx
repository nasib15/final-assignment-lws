"use client";

import { useRouter } from "next/navigation";
import { CrossIcon } from "../Icons/Icon";

const CloseButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button
      className="absolute right-2 top-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
      aria-label="Close modal"
      onClick={handleClick}
    >
      <CrossIcon />
    </button>
  );
};

export default CloseButton;
