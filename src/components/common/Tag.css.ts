import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  alignItems: "center",
  justifyItems: "center",
  border: "1px solid #000",
  borderRadius: "3px",
  padding: "2px",
  // height: "100%",
});

export const imageContainer = style({
  position: "relative",
  width: "15px",
  height: "15px",
  marginRight: "2px",
});
