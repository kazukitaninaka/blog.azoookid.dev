import { style } from "@vanilla-extract/css";

export const article = style({
  lineHeight: "1.6",
});
export const title = style({
  textAlign: "center",
});

export const publishedAt = style({
  textAlign: "center",
});

export const imgWrapper = style({
  width: "100%",
  height: "300px",
  position: "relative",
});

export const listParent = style({
  listStylePosition: "inside",
});

export const li = style({
  paddingLeft: "0.5em",
});

export const h2 = style({
  ":before": {
    content: "## ",
  },
});

export const h3 = style({
  ":before": {
    content: "### ",
  },
});

export const a = style({
  textDecoration: "underline",
});

export const caption = style({
  textAlign: "center",
  color: "#666",
  fontSize: "0.8rem",
  marginTop: "0.5rem",
});
