import { style } from "@vanilla-extract/css";

export const container = style({
  maxWidth: "750px",
  margin: "auto",
  "@media": {
    "screen and (max-width: 750px)": {
      margin: "0 10px",
    },
  },
});
