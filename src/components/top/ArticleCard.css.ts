import { style } from "@vanilla-extract/css";

export const container = style({
  margin: "20px 0",
  display: "flex",
  gap: "20px",
  ":hover": {
    opacity: "0.75",
  },
});

export const title = style({
  fontSize: "1.5rem",
  textDecorationLine: "underline",
  cursor: "pointer",
  marginBottom: "10px",
});
