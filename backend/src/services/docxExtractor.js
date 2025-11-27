const fs = require('graceful-fs');
var extract = require('docx-extractor');

async function getCommentsFromDocx(path) {
  const buffer = await fs.promises.readFile(path);
  const data = await extract(buffer);
  // inspect data to see how comments are represented
  console.log(data.comments);
}

getCommentsFromDocx(`C:\\Projects\\forwriters\\backend\\uploads\\Himmler.docx`)
  .then(() => console.log('done'))
  .catch(err => console.error(err));
