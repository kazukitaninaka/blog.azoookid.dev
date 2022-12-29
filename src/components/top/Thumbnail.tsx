import React from "react";
import Image from "next/image";
import * as styles from "./Thumbnail.css";

type Props = {
  src: string;
};

const Thumbnail: React.VFC<Props> = ({ src }) => {
  return (
    <div className={styles.imageContainer}>
      <Image src={src} alt="thumbnail" layout="fill" objectFit="cover" />
    </div>
  );
};

export default Thumbnail;
