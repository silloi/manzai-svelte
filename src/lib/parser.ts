import YAML from 'yaml';

export enum MESSAGE_TYPE {
  DESCRIPTIVE,
  SUBJECTIVE,
  OBJECTIVE,
};

export type Message = {
  type: MESSAGE_TYPE;
  name: string;
  message?: string;
  media?: string;
}

export type ParsedText = {
  header: any;
  contents: Message[];
}

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
  result.contents = parseBody(rawBody.trim());

  return result;
}

const eliminateFirstLetter = (str: string) => {
  return str.slice(1);
}

export const parseBody = (text: string): Message[] => {
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

    if (namePair.startsWith('\\')) {
      const name = eliminateFirstLetter(namePair);

      return {
        type: MESSAGE_TYPE.OBJECTIVE,
        name: name,
        ...parseMessage(message),
      };
    }

    if (namePair.startsWith('/')) {
      const name = eliminateFirstLetter(namePair);

      return {
        type: MESSAGE_TYPE.SUBJECTIVE,
        name: name,
        ...parseMessage(message),
      };
    }

    return {
      type: MESSAGE_TYPE.SUBJECTIVE,
      name: namePair,
      ...parseMessage(message),
    };
  })

  return parsedLines;
}

const parseMessage = (message: string) => {
  console.log('MESSAGE', message);
  if (message.startsWith('[') && message.endsWith(']')) {
    const media = message.slice(1, message.length - 1);
    return { media };
  }

  return { message };
}