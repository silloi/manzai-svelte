import type { MESSAGE_TYPE } from "../enums/common"

export type ParsedText = {
  header?: Header;
  contents: Message[];
}

export type Header = { [key: string]: string | Message[] };

export type Message = {
  type?: MESSAGE_TYPE;
  name?: string;
  avatar?: string;
  message?: string;
  media?: string;
}
