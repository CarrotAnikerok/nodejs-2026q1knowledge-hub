import { MaxPromptLength } from 'src/constants/enums';

export function getSummarizeArticlePrompt(
  articleContent: string,
  length: MaxPromptLength,
) {
  switch (length) {
    case MaxPromptLength.SHORT:
      return `You will receive article text. Please, very briefly, be as short and useful as you can, in no more than several sentences, summarize this article content.: ${articleContent}`;
    case MaxPromptLength.MEDIUM:
      return `You will receive article text. Please, summarize this article content in medium length description with core highlights: ${articleContent}`;
    case MaxPromptLength.DETAILED:
      return `You will receive article text. Please, summarize this article content with details, explaining things properly: ${articleContent}`;
    default:
      return `You will receive article text. Please, summarize this article content in medium length description with core highlights: ${articleContent}`;
  }
}
