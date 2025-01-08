"use client";

import { performDelete } from "@/app/actions/hotels";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const DeleteBtn = ({ hotelId }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const res = await performDelete(hotelId);

      if (res.success) {
        toast.success("Hotel deleted successfully");
        router.refresh();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <i className="fas fa-trash-alt group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50"></i>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            hotel.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
