import { style } from "@vanilla-extract/css";

export const imageContainer = style({
  width: "120px",
  height: "120px",
  position: "relative",
  border: "1px solid #fff",
  borderRadius: "5px",
  "@media": {
    "screen and (max-width: 750px)": {
      width: "100px",
      height: "100px",
    },
  },
});
