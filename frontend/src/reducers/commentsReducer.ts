import { CommentsAction, CommentDTO} from "../types/FeedbackTypes"

export const commentsReducer = (
  state: CommentDTO[],
  action: CommentsAction
): CommentDTO[] => {
  switch (action.type) {
    case "load":
      return action.comments;

    case "add_optimistic":
      return [...state, action.comment];

    case "replace":
      return state.map(c =>
        c.id === action.tempId ? action.comment : c
      );

    case "update_text":
      return state.map(c =>
        c.id === action.id ? { ...c, commentText: action.text } : c
      );

    case "resolve":
      return state.map(c =>
        c.id === action.id ? { ...c, isResolved: action.isResolved } : c
      );

    case "remove":
      return state.filter(c => c.id !== action.id);

    default:
      return state;
  }
}
