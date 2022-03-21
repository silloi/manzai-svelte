import yaml from "js-yaml";
import { MESSAGE_TYPE } from "./enums/common";
import type { Header, Message, ParsedText } from "./types/common";
import { isObject, eliminateFirstLetter, eliminateLastLetter } from "./util";

export const parseText = (text: string): ParsedText => {
  const result = {
    header: {},
    contents: <Message[]>[],
  };

  const splitText = text.split("---\n");

  if (splitText.length < 3) {
    const rawBody = splitText[splitText.length - 1];
    result.contents = parseBody(rawBody.trim());

    return result;
  }

  const [, rawHeader, rawBody] = splitText;

  result.header = parseHeader(rawHeader.trim());
  result.contents = parseBody(rawBody.trim(), result.header);

  return result;
}

const parseHeader = (text: string) => {
  const header = yaml.load(text.trim());

  if (!isObject(header)) {
    return {};
  }

  return header as Header;
}

const parseBody = (text: string, header: Header = {}): Message[] => {
  const rawLines = text.split("\n\n");

  const parsedLines = rawLines.map((rawLine) => {
    const line = rawLine.trim();

    if (!line.includes(": ")) {
      return {
        type: MESSAGE_TYPE.DESCRIPTIVE,
        ...parseMessage(line),
      };
    }

    const [namePair, message] = line.split(": ");

    if (namePair.startsWith("/")) {
      const name = eliminateFirstLetter(namePair);

      return {
        name: name,
        type: MESSAGE_TYPE.SUBJECTIVE,
        avatar: assignAvatar(header, name),
        ...parseMessage(message),
      };
    }

    if (namePair.startsWith("\\")) {
      const name = eliminateFirstLetter(namePair);

      return {
        name: name,
        type: MESSAGE_TYPE.OBJECTIVE,
        avatar: assignAvatar(header, name),
        ...parseMessage(message),
      };
    }

    return {
      name: namePair,
      type: assignType(header, namePair) ?? MESSAGE_TYPE.OBJECTIVE,
      avatar: assignAvatar(header, namePair),
      ...parseMessage(message),
    };
  })

  return parsedLines;
}

const parseMessage = (message: string) => {
  if (message.startsWith("[") && message.endsWith("]")) {
    const media = eliminateLastLetter(eliminateFirstLetter(message));
    return { media };
  }

  return { message };
}

const assignType = (header: Header, name: string) => {
  const actors = parseActors(header);

  return actors?.find((element: Message) => element.name === name)?.type;
}

const assignAvatar = (header: Header, name: string) => {
  const actors = parseActors(header);

  return actors?.find((element: Message) => element.name === name)?.avatar;
}

const parseActors = (header: Header) => {
  if (!header.actors || !Array.isArray(header.actors)) {
    return undefined;
  }

  return header.actors as Message[];
};
