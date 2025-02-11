"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

type EditBlogDialogProps = {
  blog: { _id: string; title: string; description: string } | null;
  onClose: () => void;
  onSave: (updatedBlog: { id: string; title: string; description: string }) => Promise<void>;
};

const EditBlogDialog = ({ blog, onClose, onSave }: EditBlogDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Set current blog details when modal opens
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setDescription(blog.description);
    }
  }, [blog]);

  const handleSave = async () => {
    if (!blog) return;
    setIsEditing(true);
    
    try {
      await onSave({ id: blog._id, title, description });
      toast.success("Blog updated successfully!");
    } catch (error) {
      toast.error("Failed to update blog. Try again!");
      console.log(error)
    } finally {
      setIsEditing(false);
      onClose();
    }
  };

  return (
    <Dialog open={!!blog} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Edit Blog</DialogHeader>
        
        {/* Title Input */}
        <input
          className="w-full p-2 mt-3 border rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
        />
        
        {/* Description Input */}
        <textarea
          className="w-full p-2 mt-3 border rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter blog description"
        />
        
        {/* Buttons */}
        <DialogFooter>
          <Button className="bg-white text-secondary" onClick={onClose} disabled={isEditing}>
            Cancel
          </Button>
          <Button className="bg-main text-white" onClick={handleSave} disabled={isEditing}>
            {isEditing ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBlogDialog;
