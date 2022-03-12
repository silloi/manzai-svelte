import type { MESSAGE_TYPE } from "../enums/common"

export type Message = {
  type?: MESSAGE_TYPE;
  name?: string;
  avatar?: string;
  message?: string;
  media?: string;
}

export type ParsedText = {
  header: { [key: string]: string | object };
  contents: Message[];
}
