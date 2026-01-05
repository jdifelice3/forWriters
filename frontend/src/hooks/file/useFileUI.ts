import { useState, useMemo } from "react";

export function useFileUI() {
  const [targetFileMetaId, setTargetFileMetaId] = useState<string | null>(null);
  const [versionDialogOpen, setVersionDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return {
    // state
    targetFileMetaId,
    versionDialogOpen,
    deleteDialogOpen,
    title,
    setTitle,
    description,
    setDescription,
    editDialogOpen,
    setEditDialogOpen,
    uploadDialogOpen,
    setUploadDialogOpen,

    // semantic actions
    beginUploadNewVersion(fileMetaId: string) {
      setTargetFileMetaId(fileMetaId);
      setVersionDialogOpen(true);
    },

    confirmDelete(fileMetaId: string) {
      setTargetFileMetaId(fileMetaId);
      setDeleteDialogOpen(true);
    },

    closeDialogs() {
      setTargetFileMetaId(null);
      setVersionDialogOpen(false);
      setDeleteDialogOpen(false);
      setEditDialogOpen(false);
      setUploadDialogOpen(false);
    },
  };
}
