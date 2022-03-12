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

export const parseBody = (text: string, header: { [key: string]: any } = {}): Message[] => {
  const rawLines = text.split("\n\n");

  const parsedLines = rawLines.map((line) => {
    if (!line.includes(': ')) {
      return {
        type: MESSAGE_TYPE.DESCRIPTIVE,
        name: '',
        ...parseMessage(line),
      };
    }

    const [namePair, message] = line.split(': ');

    if (namePair.startsWith('/')) {
      const name = eliminateFirstLetter(namePair);

      return {
        type: MESSAGE_TYPE.SUBJECTIVE,
        name: name,
        ...assignAvatar(header, name),
        ...parseMessage(message),
      };
    }

    if (namePair.startsWith('\\')) {
      const name = eliminateFirstLetter(namePair);

      return {
        type: MESSAGE_TYPE.OBJECTIVE,
        name: name,
        ...assignAvatar(header, name),
        ...parseMessage(message),
      };
    }

    return {
      type: MESSAGE_TYPE.OBJECTIVE,
      ...assignAvatar(header, namePair),
      name: namePair,
      ...parseMessage(message),
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

const assignAvatar = (header: { [key: string]: any }, name: string) => {
  if (!header || !header.actors) {
    return { avatar: undefined };
  }

  return { avatar: header.actors.find((element: Message) => element.name === name).avatar };
}