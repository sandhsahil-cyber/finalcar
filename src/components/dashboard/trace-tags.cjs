const fs = require('fs');
const content = fs.readFileSync('d:\\finalcar\\src\\components\\dashboard\\SalesPersonDashboard.tsx', 'utf8');

const regex = /<div( [^>]*?)?(\/?)>|<\/div>/g;
let match;
let stack = [];

console.log("Line | Action | Stack Size | Stack Contents");
console.log("------------------------------------------");

while ((match = regex.exec(content)) !== null) {
    const fullTag = match[0];
    const isSelfClosing = fullTag.endsWith('/>') || fullTag.endsWith('/> ');
    const isClosing = fullTag.startsWith('</');
    const line = content.substring(0, match.index).split('\n').length;
    
    if (!isSelfClosing) {
        if (isClosing) {
            if (stack.length === 0) {
                console.log(`${String(line).padStart(4)} | CLOSE  | 0 (ERR)   | []`);
            } else {
                stack.pop();
                console.log(`${String(line).padStart(4)} | CLOSE  | ${String(stack.length).padEnd(10)} | [${stack.join(', ')}]`);
            }
        } else {
            stack.push(line);
            console.log(`${String(line).padStart(4)} | OPEN   | ${String(stack.length).padEnd(10)} | [${stack.join(', ')}]`);
        }
    } else {
        // console.log(`${String(line).padStart(4)} | SELF   | ${String(stack.length).padEnd(10)} | [${stack.join(', ')}]`);
    }
}

console.log("------------------------------------------");
if (stack.length > 0) {
    console.log(`ERROR: ${stack.length} tags left open at the end of file: lines ${stack.join(', ')}`);
} else {
    console.log("ALL DIV TAGS BALANCED.");
}
