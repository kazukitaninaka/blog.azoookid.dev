import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  padding: "30px 0",
  "@media": {
    "screen and (max-width: 750px)": {
      flexDirection: "column",
    },
  },
});

export const nextContainer = style({
  marginRight: "auto",
  textDecoration: "underline",
});

export const prevContainer = style({
  marginLeft: "auto",
  textDecoration: "underline",
});
