import { AppFile } from '../types/FileTypes';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import pdfIcon from '../assets/icons/icons8-pdf-48.png';
import wordIcon from '../assets/icons/icons8-word-file-48.png';
import { Avatar } from "@mui/material";  
  

interface FileIconProps {
  file: AppFile;
}

const FileIcon: React.FC<FileIconProps> = ({file}) => {
    if (file.mimetype.startsWith("image/")) {
      return <Avatar src={file.url} variant="rounded" sx={{ width: 40, height: 40 }} />;
    }
    //if (f.mimetype === "application/pdf") return <DescriptionIcon color="error" />;
    if (file.mimetype === "PDF") return <img src={pdfIcon} className='icon' alt="PDF" />;
    if (file.mimetype === "DOCX") return <img src={wordIcon} className='icon' alt="DOCX" />;
    if (file.mimetype.startsWith("text/")) return <InsertDriveFileIcon color="primary" />;
    return <InsertDriveFileIcon color="action" />;
};

export default FileIcon;