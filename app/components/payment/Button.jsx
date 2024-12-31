'use client'
import { useRouter } from "next/navigation";

export const Button = () => {
  const router = useRouter();
  return (
    <button onClick={()=> router.back()} className="text-zinc-800 hover:underline">
      <i className="fas fa-chevron-left mr-2"></i>
      Back
    </button>
  );
}

export default Button;
