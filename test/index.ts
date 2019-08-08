import * as yaml from 'js-yaml';
import * as fs from 'fs';
import { expect } from 'chai';


describe('Parse yml files', function () {

  it('CNAB 240', () => {
    let filelist = [];
    filelist = walkSync('./cnab240/', filelist);
    const ymls = filelist.forEach(f=>{
      console.log('CNAB 240', f);
      const yml = readYaml(f);
      expect(yml).not.empty;
    });
  });

  it('CNAB 400', () => {
    let filelist = [];
    filelist = walkSync('./cnab400/', filelist);
    const ymls = filelist.forEach(f=>{
      console.log('CNAB 400', f);
      const yml = readYaml(f);
      expect(yml).not.empty;
    });
  });
});


const readYaml = function (filename) {
  return yaml.safeLoad(fs.readFileSync(filename, `utf8`));
}

var walkSync = function (dir, filelist) {
  var fs = fs || require('fs'),
    files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function (file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    }
    else {
      filelist.push(dir + file);
    }
  });
  return filelist;
};
