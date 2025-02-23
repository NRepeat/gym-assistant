import PDFParser from "pdf2json";
import fs from "fs";
export const workOfTheDayParser = async (content: HTMLElement) => {
	try {
		const paragraphs = content.querySelectorAll('p');
		return Array.from(paragraphs).map((p) => {
			// Extract the text content
			if (p.textContent === null) return;
			const textContent = p.textContent.trim();



			return { textContent };
		});
	} catch (error) {
		throw new Error(`Work of teh day parser error ${error}`)
	}

}


// const extractTextFromPDF = async (filePath: string, workOutNum: string) => {
// 	try {
// 		const dataBuffer = fs.readFileSync(filePath);
// 		const data = await PdfParse(dataBuffer);
// 		const text = data.text;
// 		const lineToScips1 = '© 2017 CrossFit Inc. CrossFit and Forging Elite Fitness are registered trademarks and “3...2...1...Go!'
// 		const lineToScips2 = 'Fittest on Earth and Sport of Fitness are trademarks of CrossFit, Inc. All Rights Reserved.\n'
// 		const sections = {
// 			[`WORKOUT ${workOutNum}`]: '',
// 			NOTES: '',
// 			TIEBREAK: '',
// 			EQUIPMENT: '',
// 			"VIDEO SUBMISSION STANDARDS": '',
// 			"MOVEMENT STANDARDS": '',
// 			'VARIATIONS': '',
// 			SCORECARD: '',
// 		};

// 		let currentSection: any = null;
// 		let workoutMeets = 0
// 		console.log('trimmedLine', text)
// 		text.split('\n').forEach(line => {
// 			const trimmedLine = line.trim();
// 			if (trimmedLine.includes('WORKOUT')) {
// 				if (workoutMeets === 0) {
// 					currentSection = `WORKOUT ${workOutNum}`
// 					sections[`WORKOUT ${workOutNum}`] += trimmedLine + '\n';
// 				}
// 				workoutMeets++
// 			} else if (sections.hasOwnProperty(trimmedLine)) {
// 				if (trimmedLine === 'VIDEO SUBMISSION STANDARDS') {
// 					currentSection = null
// 				} else {
// 					currentSection = trimmedLine;

// 				}
// 			} else if (currentSection) {
// 				//@ts-ignore
// 				if (trimmedLine.includes('OPEN WEEK 2 SCORECARD')) {
// 					currentSection = 'SCORECARD'
// 				}
// 				if (trimmedLine.includes('TIEBREAK')) {
// 					currentSection = 'TIEBREAK'
// 				}
// 				sections[currentSection] += trimmedLine + '\n';
// 			}


// 		});
// 		const movementLines = sections["MOVEMENT STANDARDS"].split('\n');
// 		const movements = [];
// 		let currentExercise: any = null;

// 		movementLines.forEach(line => {
// 			if (/^[A-Z\s\-]+(\([A-Z\s\-\0-9]+\))?$/.test(line.trim()) && line.trim().length > 3) {
// 				console.log('line.trim()', line.trim())
// 				if (currentExercise) {
// 					movements.push(currentExercise);
// 				}
// 				currentExercise = { name: line.trim(), description: '' };
// 				console.log('currentExercise', currentExercise)
// 			} else if (currentExercise) {
// 				currentExercise.description += line.trim() + ' ';
// 			}
// 		});
// 		if (currentExercise) {
// 			movements.push(currentExercise);
// 		}

// 		console.log('movements', movements)
// 		console.log('sections', sections)
// 		return sections;

// 	} catch (error) {
// 		console.error('Ошибка при парсинге PDF:', error);
// 	}
// };
// console.log('Done')