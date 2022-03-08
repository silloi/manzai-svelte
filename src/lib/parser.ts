import YAML from 'yaml';

export const MESSAGE_TYPE = {
  SUBJECTIVE: 'subjective',
  OBJECTIVE: 'objective',
  DESCRIPTIVE: 'descriptive',
  MEDIA: 'media',
} as const;

export interface IMessage {
  type: typeof MESSAGE_TYPE[keyof typeof MESSAGE_TYPE];
  narrator: string;
  message: string;
  media: string;
}

export interface IParsedText {
  header: any;
  contents: IMessage[];
}


export const parseText = (text: string): IParsedText => {
  const result = {
    header: {},
    contents: [],
  };

  const textSplit = text.split('---\n');

  if (textSplit.length < 3) {
    const rawBody = textSplit[textSplit.length - 1];
    result.contents = parseBody(rawBody);

    return result;
  }

  const [, rawHeader, rawBody] = textSplit;

  result.header = YAML.parse(rawHeader.trim());
  result.contents = parseBody(rawBody.trim());

  return result;
}

const eliminateFirstLetter = (str: string) => {
  return str.slice(1);
}

export const parseBody = (text: string): IMessage[] => {
  const rawLines = text.split("\n\n");

  const parsedLines = rawLines.map((line) => {
    if (line.startsWith('[') && line.endsWith(']')) {
      const src = line.slice(1, line.length - 1);

      return {
        type: MESSAGE_TYPE.MEDIA,
        narrator: '',
        message: '',
        media: src,
      }
    }

    if (!line.includes(':')) {
      return {
        type: MESSAGE_TYPE.DESCRIPTIVE,
        narrator: '',
        message: line,
        media: '',
      };
    }

    const [narratorPair, message] = line.split(': ');

    if (narratorPair.startsWith('\\')) {
      const narrator = eliminateFirstLetter(narratorPair);

      return {
        type: MESSAGE_TYPE.OBJECTIVE,
        narrator: narrator,
        message: message,
        media: '',
      };
    }

    if (narratorPair.startsWith('/')) {
      const narrator = eliminateFirstLetter(narratorPair);

      return {
        type: MESSAGE_TYPE.SUBJECTIVE,
        narrator: narrator,
        message: message,
        media: '',
      };
    }

    return {
      type: MESSAGE_TYPE.SUBJECTIVE,
      narrator: narratorPair,
      message: message,
      media: '',
    };
  })

  return parsedLines;
}
