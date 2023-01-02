import { style } from "@vanilla-extract/css";

export const container = style({
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  gridTemplateColumns: "100%",
  minHeight: "100vh",
  gap: "20px",
});

export const mainContainer = style({
  width: "100%",
  maxWidth: "750px",
  margin: "0 auto",
  "@media": {
    "screen and (max-width: 750px)": {
      padding: "0 10px",
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

export const footer = style({
  padding: "20px",
  borderTop: "1px solid #000",
  display: "grid",
  placeItems: "center",
});

export const emoji = style({});
