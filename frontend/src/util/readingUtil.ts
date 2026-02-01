import { Reading } from "../types/domain-types";

export const getSpotsOpenText = (e: Reading) => {
    if(e.readingParticipant){
      if(e.readingParticipant.length !== e.spotsOpen){
        return `${e.spotsOpen - e.readingParticipant.length} of ${e.spotsOpen} spots open`;
      } else {
        return "The reading is full";
      }
    } 
    if(!e.readingParticipant){
      return `${e.spotsOpen} of ${e.spotsOpen} spots open`;
    }
  }