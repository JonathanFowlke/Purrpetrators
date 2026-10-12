// Scaffold a draft newsletter edition: npm run new-edition -- 002
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectRoot } from './lib/load-data.mjs';

export async function createEdition(root, id) {
  if (!/^\d{3}$/.test(id || '')) throw new Error('Use a three-digit ID, e.g. npm run new-edition -- 002.');
  const record = {id, status:'draft', title:'Next edition in preparation', subject:'PNN: A new briefing is in preparation', preheader:'The newsroom is preparing its next edition.',
    sections:[{tone:'dark', kicker:"FROM INSPECTOR CLUESO'S DESK", heading:'The next briefing is taking shape.', blocks:[{type:'paragraph',runs:[{text:'The newsroom is preparing its next edition.'}]}]}]};
  await mkdir(path.join(root,'data/newsletters'), {recursive:true});
  await writeFile(path.join(root,`data/newsletters/${id}.json`), JSON.stringify(record,null,2)+'\n', {flag:'wx'});
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await createEdition(projectRoot, process.argv[2]);
    console.log(`Created data/newsletters/${process.argv[2]}.json. Edit it, then run npm run build.`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
