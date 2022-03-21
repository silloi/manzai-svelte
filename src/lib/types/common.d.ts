import type { MESSAGE_TYPE } from "../enums/common"

export type ParsedText = {
  header?: Header;
  contents: Content[];
}

export type Header = { [key: string]: string | Content[] };

export type Content = {
  type?: MESSAGE_TYPE;
  name?: string;
  avatar?: string;
  message?: string;
  media?: string;
}
