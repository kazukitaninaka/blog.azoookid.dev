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

export const header = style({
  borderBottom: "1px solid #000",
});

export const linkContainer = style({
  margin: "20px",
  fontSize: "2rem",
  fontWeight: "bold",
});
