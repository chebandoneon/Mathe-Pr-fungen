import jsPDF from 'jspdf';
import type { Problem } from '../types';

const addWrappedText = (doc: jsPDF, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number => {
    const lines = doc.splitTextToSize(text, maxWidth);
    let currentY = y;
    
    lines.forEach((line: string) => {
        if (currentY > doc.internal.pageSize.height - 20) {
            doc.addPage();
            currentY = 20;
        }
        doc.text(line, x, currentY);
        currentY += lineHeight;
    });

    return currentY;
};

export const exportProblemsToPdf = (problems: Problem[]) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    const maxWidth = pageWidth - margin * 2;
    let y = 20;

    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Math Quest: Übungsblatt', pageWidth / 2, y, { align: 'center' });
    y += 20;

    doc.setFontSize(16);
    doc.text('Aufgaben', margin, y);
    y += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');

    problems.forEach((problem, index) => {
        const questionText = `${index + 1}. ${problem.question}`;
        y = addWrappedText(doc, questionText, margin, y, maxWidth, 7);
        y += 7; 

        if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
        }
    });

    doc.addPage();
    y = 20;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Lösungen', margin, y);
    y += 10;

    problems.forEach((problem, index) => {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        y = addWrappedText(doc, `Lösung zu Aufgabe ${index + 1}:`, margin, y, maxWidth, 7);
        
        doc.setFont('helvetica', 'normal');
        
        problem.solutionSteps.forEach(step => {
            y = addWrappedText(doc, `- ${step}`, margin + 5, y, maxWidth - 5, 7);
        });
        
        doc.setFont('helvetica', 'italic');
        y = addWrappedText(doc, `Antwort: ${problem.finalAnswer}`, margin + 5, y, maxWidth-5, 7);
        y += 10; 

        if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
        }
    });

    doc.save('Math-Quest-Uebungsblatt.pdf');
};