import YAML from 'yaml';
import { MESSAGE_TYPE } from './enums/common';
import type { Message, ParsedText } from './types/common';

export const parseText = (text: string): ParsedText => {
  const result = {
    header: {},
    contents: [],
  };

  const splitText = text.split('---\n');

  if (splitText.length < 3) {
    const rawBody = splitText[splitText.length - 1];
    result.contents = parseBody(rawBody.trim());

    return result;
  }

  const [, rawHeader, rawBody] = splitText;

  result.header = YAML.parse(rawHeader.trim());
  result.contents = parseBody(rawBody.trim(), result.header);

  return result;
}

const eliminateFirstLetter = (str: string) => {
  return str.slice(1);
}

export const parseBody = (text: string, header: { [key: string]: Message[] } = {}): Message[] => {
  const rawLines = text.split("\n\n");

  const parsedLines = rawLines.map((line) => {
    if (!line.includes(': ')) {
      return {
        ...parseMessage(line),
        type: MESSAGE_TYPE.DESCRIPTIVE,
      };
    }

    const [namePair, message] = line.split(': ');

    if (namePair.startsWith('/')) {
      const name = eliminateFirstLetter(namePair);

      return {
        ...assignType(header, name),
        ...assignAvatar(header, name),
        ...parseMessage(message),
        type: MESSAGE_TYPE.SUBJECTIVE,
        name: name,
      };
    }

    if (namePair.startsWith('\\')) {
      const name = eliminateFirstLetter(namePair);

      return {
        ...assignType(header, name),
        ...assignAvatar(header, name),
        ...parseMessage(message),
        name: name,
        type: MESSAGE_TYPE.OBJECTIVE,
      };
    }

    return {
      ...assignType(header, namePair),
      ...assignAvatar(header, namePair),
      ...parseMessage(message),
      type: MESSAGE_TYPE.OBJECTIVE,
      name: namePair,
    };
  })

  return parsedLines;
}

const parseMessage = (message: string) => {
  if (message.startsWith('[') && message.endsWith(']')) {
    const media = message.slice(1, message.length - 1);
    return { media };
  }

  return { message };
}

const assignType = (header: { [key: string]: Message[] }, name: string) => {
  if (!header || !header.actors) {
    return { type: undefined };
  }

  return { type: header.actors.find((element: Message) => element.name === name).type };
}

const assignAvatar = (header: { [key: string]: Message[] }, name: string) => {
  if (!header || !header.actors) {
    return { avatar: undefined };
  }

  return { avatar: header.actors.find((element: Message) => element.name === name).avatar };
}