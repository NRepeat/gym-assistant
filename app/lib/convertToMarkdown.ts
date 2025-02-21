type ContentBlock = {
	type: string;
	content: string;
};
export function convertJsonToMarkdown(data: ContentBlock[]): string {
	return data
		.map(block => block.content.replace(/\n/g, '  \n')) // Добавляем двойной пробел для разрыва строки в Markdown
		.join('\n\n'); // Разделяем абзацы пустой строкой
}

