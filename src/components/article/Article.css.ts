import { globalStyle, style } from "@vanilla-extract/css";

export const title = style({
  textAlign: "center",
});

export const publishedAt = style({
  textAlign: "center",
});

export const markdownStyles = style({});

globalStyle(
  `${markdownStyles} p, ${markdownStyles} blockquote, ${markdownStyles} ul, ${markdownStyles} ol, ${markdownStyles} li`,
  {
    margin: "1rem 0",
  }
);

globalStyle(`${markdownStyles} ul`, {
  listStylePosition: "inside",
});

globalStyle(`${markdownStyles} ul li`, {
  paddingLeft: "0.5em",
});
