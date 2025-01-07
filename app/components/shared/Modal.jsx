"use client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export default function Modal({ children }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();
  const pathName = usePathname();

  const onDismiss = useCallback(() => {
    router.push("/");
  }, [router]);

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        onDismiss();
      }
    },
    [onDismiss]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  // close modal on route change
  const isLoginOrRegistrationPage =
    pathName === "/login" || pathName === "/register";

  if (!isLoginOrRegistrationPage) {
    return null;
  }

  return (
    <div
      ref={overlay}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/40 backdrop-blur-sm overflow-y-auto"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute top-0 left-0 right-0 min-h-full w-full p-6 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:min-h-0 lg:w-11/12"
      >
        {children}
      </div>
    </div>
  );
}
