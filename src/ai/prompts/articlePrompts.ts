import { AnalyzeTask, MaxPromptLength } from 'src/constants/enums';

export function getSummarizeArticlePrompt(
  articleContent: string,
  length: MaxPromptLength,
) {
  switch (length) {
    case MaxPromptLength.SHORT:
      return `Please, very briefly, be as short and useful as you can, in no more than several sentences, summarize this article content.: ${articleContent}`;
    case MaxPromptLength.MEDIUM:
      return ` Please, summarize this article content in medium length description with core highlights: ${articleContent}`;
    case MaxPromptLength.DETAILED:
      return `Please, summarize this article content with details, explaining things properly and detailed: ${articleContent}`;
    default:
      return `Please, summarize this article content in medium length description with core highlights: ${articleContent}`;
  }
}

export function getSummarizeInstruction() {
  return `You will receive an article. 
  Please, summarize this article according the way the prompt suggest: short, medium or detailed`;
}

export function getTranslateArticlePrompt(
  articleContent: string,
  targetLanguage: string,
  sourceLanguage: string = '',
) {
  if (sourceLanguage) {
    return `Please, translate text from ${sourceLanguage} to ${targetLanguage}: ${articleContent}`;
  }

  return `Please, translate text to ${targetLanguage}: ${articleContent}`;
}

export function getTranslationInstruction() {
  return `You're a translator. 
  Always response only in JSON format: { "translation": "...", "detected_language": "..." }`;
}

export function getAnalyzeArticlePrompt(
  articleContent: string,
  task: AnalyzeTask = AnalyzeTask.REVIEW,
) {
  return `Analyze article in the ${task} format: ${articleContent}`;
}

export function getAnalyzeInstruction() {
  return `You need to analyze given article in given in prompt format: 'review', 'bugs', 'optimize', 'explain'.
  After analyzing you need to make suggestions to the article and decide what the severity from this analysis.
  Severity can be only 'info', 'warning', 'error'. 
  Always response only in JSON format: { "analysis": "...", "suggestions": "[..., ...]", severity: "..." }`;
}
