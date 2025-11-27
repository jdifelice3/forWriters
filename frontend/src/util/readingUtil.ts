import { Reading } from "../../../backend/src/domain-types";

export const getSpotsOpenText = (e: Reading) => {
    if(e.readingAuthor){
      if(e.readingAuthor.length !== e.spotsOpen){
        return `${e.spotsOpen - e.readingAuthor.length} of ${e.spotsOpen} spots open`;
      } else {
        return "The reading is full";
      }
    } 
    if(!e.readingAuthor){
      return `${e.spotsOpen} of ${e.spotsOpen} spots open`;
    }
  }