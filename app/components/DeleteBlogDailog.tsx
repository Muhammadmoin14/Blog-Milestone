"use client";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useState } from "react";

type DeleteBlogDialogProps = {
  blogId: string | null;
  onClose: () => void;
  onDelete: (blogId: string) => Promise<boolean>; // Update return type
};

const DeleteBlogDialog = ({ blogId, onClose, onDelete }: DeleteBlogDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!blogId) return;
    setIsDeleting(true);
    try {
      const success = await onDelete(blogId); // Wait for deletion
      if (success) {
        toast.success("Blog deleted successfully!");
      } else {
        toast.error("Failed to delete blog. Try again!");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog. Try again!");
    } finally {
      setIsDeleting(false);
      onClose(); // Close modal
    }
  };

  return (
    <Dialog open={!!blogId} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Are you sure you want to delete this blog?</DialogHeader>
        <DialogFooter>
          <Button className="bg-main text-white" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-red-500 text-white"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBlogDialog;