import { Paragraph } from "@tiptap/extension-paragraph";

export const ParagraphWithId = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      paragraphId: {
        default: null,
        parseHTML: element =>
          element.getAttribute("data-paragraph-id"),
        renderHTML: attributes => {
          if (!attributes.paragraphId) {
            return {};
          }
          return {
            "data-paragraph-id": attributes.paragraphId,
          };
        },
      },
    };
  },
});
