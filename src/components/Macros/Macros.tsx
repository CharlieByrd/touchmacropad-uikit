import { Image, Text } from "@chakra-ui/react";
import { useCallback, useContext } from "react";

import { TouchContext } from "../TouchContext/TouchContext";

import style from "./Marcos.module.css";
import { MacrosProps } from "./type";

export const Macros = (props: MacrosProps) => {
  const {
    extraProps: { imageHref, title, keys },
  } = props;
  const {
    handlers: { onWidgetEvent },
  } = useContext(TouchContext);

  const handleClick = useCallback(() => {
    onWidgetEvent("macros", keys ?? []);
  }, [keys, onWidgetEvent]);

  return (
    <div className={style.macros} onClick={handleClick} role="button">
      {title ? <Text>{title}</Text> : null}
      <Image draggable="false" src={imageHref} height="80px" />
    </div>
  );
};
