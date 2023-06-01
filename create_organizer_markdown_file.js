const fs = require('fs');
const path = require('path');

// These functions create a markdown file with dates and sections for writing
// daily tasks and completed tasks.

function generateText(date) {
  // uses a Date method to turn date into string
  return `## ${date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric', // \n for line breaks.
  })}\n\n### Tasks\n\n- x\n\n### Coding\n\n- x\n\n### Fitness\n\n- x\n\n---\n\n`;
}

function createMonthlyMarkdownFile(year, month) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  let markdownContent = `# ${startDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })}\n\n`;
  let currentDate = startDate;
  while (currentDate < endDate) {
    // loops and adds text for each day
    markdownContent += generateText(currentDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const yearDirectory = `${startDate.getFullYear()}`;
  if (!fs.existsSync(yearDirectory)) {
    // fs stuff i don't understand 💩
    fs.mkdirSync(yearDirectory);
  }

  const fileName = path.join(
    yearDirectory, // creates filename from the data, ex: 2023-04.md
    `${year}-${String(month).padStart(2, '0')}.md`
  );
  fs.writeFileSync(fileName, markdownContent);
}

createMonthlyMarkdownFile(2023, 5); // call it here with the month and year
