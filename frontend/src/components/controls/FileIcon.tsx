import { AppFile } from "../../types/domain-types";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import pdfIcon from "../../assets/icons/icons8-pdf-48.png";
import wordIcon from '../../assets/icons/icons8-word-file-48.png';
import { Avatar } from "@mui/material";  
  

interface FileIconProps {
  file: AppFile | undefined;
}

const FileIcon: React.FC<FileIconProps> = ({file}) => {
    if(!file){
      return <InsertDriveFileIcon color="primary" />;
    }
    if (file.mimetype.startsWith("image/")) {
      return <Avatar src={file.url} variant="rounded" sx={{ width: 40, height: 40 }} />;
    }
    if (file.mimetype.startsWith("text/")) return <InsertDriveFileIcon color="primary" />;
    if (file.mimetype === "PDF") return <img src={pdfIcon} className='icon' alt="PDF" />;
    if (file.mimetype === "DOCX") return <img src={wordIcon} className='icon' alt="DOCX" />;
    
    return <InsertDriveFileIcon color="action" />;
};

export default FileIcon;