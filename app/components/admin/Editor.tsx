import React, { useEffect, useState } from 'react';
import rehypeSanitize from "rehype-sanitize";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import '~/styles/editorStyles.css';


const Editor = ({ content }: { content: string }) => {
	const [value, setValue] = useState(content);
	console.log('value', value)
	const [MDEditor, setMDEditor] = useState<any>(null);
	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		// Dynamically import the MDEditor component
		import('@uiw/react-md-editor').then((mod) => {
			setMDEditor(mod.default);
		});
	}, []);

	if (!MDEditor) {
		// Render a fallback while the MDEditor is being loaded
		return <div>Loading editor...</div>;
	}
	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		document.documentElement.setAttribute('data-color-mode', newTheme);
	};
	return (
		<div className='p-4'>

			<div data-color-mode={'dark'} className="wmde-markdown-var">
				<MDEditor
					className=''
					value={value}
					onChange={setValue}
					height={500}
					previewOptions={{
						rehypePlugins: [[rehypeSanitize]],
					}}
				/>
				<div className='p-4'>
					<MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} className='p-4' />
				</div>
			</div>
		</div>
	);
}

export default Editor;