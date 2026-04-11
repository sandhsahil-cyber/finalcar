const fs = require('fs');

const content = fs.readFileSync('d:\\finalcar\\src\\components\\dashboard\\SalesPersonDashboard.tsx', 'utf8');

const tags = [];
const regex = /<([a-zA-Z0-9]+)( [^>]*?)?(\/?)>|<\/([a-zA-Z0-9]+)>/g;
let match;

console.log("Analyzing tag balance...");

while ((match = regex.exec(content)) !== null) {
    const fullTag = match[0];
    const tagName = match[1] || match[4];
    const isSelfClosing = fullTag.endsWith('/>') || fullTag.endsWith('/> ');
    const isClosing = fullTag.startsWith('</');
    const isOpening = !isClosing && !isSelfClosing;

    const line = content.substring(0, match.index).split('\n').length;
    
    if (isOpening) {
        tags.push({ name: tagName, line, full: fullTag });
    } else if (isClosing) {
        if (tags.length === 0) {
            console.log(`ERROR: Found closing </${tagName}> at line ${line} with no matching open tag.`);
        } else {
            const last = tags.pop();
            if (last.name !== tagName) {
                console.log(`ERROR: Mismatched tag at line ${line}. Expected </${last.name}> (opened at L${last.line}), but found </${tagName}>.`);
                // Push back so we don't cascade too much? Or just log.
            }
        }
    }
}

if (tags.length > 0) {
    console.log(`ERROR: Found ${tags.length} unclosed tags.`);
    tags.reverse().forEach(t => {
        console.log(`Unclosed <${t.name}> opened at line ${t.line}`);
        const lines = content.split('\n');
        console.log(`Context: ${lines[t.line-1].trim()}`);
    });
} else {
    console.log("All tags are balanced.");
}
