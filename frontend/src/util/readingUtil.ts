import { Reading } from "../types/domain-types";

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

export const getCardBackgroundColor = (r: Reading) => {
    if(r === undefined || r.scheduledType === "SCHEDULED" ){
        if(r.submissionDeadline && new Date(r.submissionDeadline) > new Date()){
            return "#e3f2fd";
        } else {
            return "#f3e5f5";
        }
    } else {
        return "#e3f2fd";
    }
}