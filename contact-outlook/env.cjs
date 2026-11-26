const fs=require('node:fs'),path=require('node:path');
const file=path.join(__dirname,'.env');
if(fs.existsSync(file)){for(const line of fs.readFileSync(file,'utf8').split(/\r?\n/)){const match=line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);if(!match||Object.hasOwn(process.env,match[1]))continue;let value=match[2];if((value.startsWith('"')&&value.endsWith('"'))||(value.startsWith("'")&&value.endsWith("'")))value=value.slice(1,-1);process.env[match[1]]=value;}}
