const {readFileSync, writeFileSync} = require('fs');

const sample = readFileSync('./src/app/generated/sample.component.ts').toString();

const iterations = 5_000;
let template = '';
let imports = '';
let declarations = '';

for (let i = 0; i < iterations; i++) {
  writeFileSync(`./src/app/generated/generated-${i}.component.ts`, sample.replaceAll('${1}', i));
  template += `    <sp-generated-${i}></sp-generated-${i}>` + '\n';
  imports += `import {GeneratedComponent${i}} from "./generated/generated-${i}.component";` + '\n';
  declarations += `    GeneratedComponent${i},` + '\n';
}

const appComponent = readFileSync('./src/app/app.component.ts').toString();
writeFileSync(
  './src/app/app.component.ts',
  appComponent.replaceAll('<!-- REPLACE ME -->', template)
);

const appModule = readFileSync('./src/app/app.module.ts').toString()
writeFileSync(
  './src/app/app.module.ts',
  appModule
    .replaceAll('// REPLACE IMPORT', imports)
    .replaceAll('// REPLACE DECLARATION', declarations)
);
