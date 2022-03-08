import YAML from 'yaml';

export const MESSAGE_TYPE = {
  SUBJECTIVE: 'subjective',
  OBJECTIVE: 'objective',
  DESCRIPTIVE: 'descriptive',
} as const;

export interface IMessage {
  type: typeof MESSAGE_TYPE[keyof typeof MESSAGE_TYPE];
  narrator: string;
  message: string;
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
    if (!line.includes(':')) {
      return {
        type: MESSAGE_TYPE.DESCRIPTIVE,
        narrator: '',
        message: line,
      };
    }

    const [narratorPair, message] = line.split(': ');

    if (narratorPair.startsWith('\\')) {
      const narrator = eliminateFirstLetter(narratorPair);

      return {
        type: MESSAGE_TYPE.OBJECTIVE,
        narrator: narrator,
        message: message,
      };
    }

    if (narratorPair.startsWith('/')) {
      const narrator = eliminateFirstLetter(narratorPair);

      return {
        type: MESSAGE_TYPE.SUBJECTIVE,
        narrator: narrator,
        message: message,
      };
    }

    return {
      type: MESSAGE_TYPE.SUBJECTIVE,
      narrator: narratorPair,
      message: message,
    };
  })

  return parsedLines;
}
