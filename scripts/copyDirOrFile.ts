import fs from "fs";
import path from "path";
import os from "os";
import { promisify } from "util";

let src = process.argv[2];
let dist = process.argv[3] || "";
// TODO: verify the path
// console.log(src)
const options = process.argv.slice(4);
let copyOptions;
if (options.includes("-r")) {
  copyOptions = {
    retry: true
  };
}

function getHomePath() {
  if (os.homedir) {
    return os.homedir();
  }
  if (process.platform === "win32") {
    return (
      process.env.USERPROFILE ||
      process.env.HOMEDRIVE + process.env.HOMEPATH ||
      process.env.HOME
    );
  } else {
    return process.env.HOME;
  }
}

function isExist(path: string) {
  return new Promise(resolve => {
    fs.access(path, (err?: Error) => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    });
  });
}

/**
 * think the path is valid
 *  @param pt
 */
function walkDictionary(pt: string): Array<string> {
  const result = [];
  // const dirList = [pt]
  // while(dirList.length > 0) {

  // }
  fs.readdirSync(pt).forEach(value => {
    const abPath = path.join(pt, value);
    const stat = fs.statSync(abPath);
    if (stat.isFile()) {
      result.push(abPath);
    }
    if (stat.isDirectory()) {
      const newResult = walkDictionary(abPath);
      result.push(...newResult);
    }
  });
  return result;
}

function safeMkdir(dist: string) {
  const dirPath = path.dirname(dist);
  if (!fs.existsSync(dirPath)) {
    safeMkdir(dirPath);
  } else {
    if (!fs.existsSync(dist)) {
      fs.mkdirSync(dist);
    }
  }
}

function safeCopyFile(src: string, dist: string) {
  const distDir = path.dirname(dist);
  safeMkdir(distDir);
  fs.copyFileSync(src, dist);
}

async function copyDirOrFile(src: string, dist: string, options: any) {
  if (options.retry === true) {
    console.log('进入重试模式')
  }
  const homePath = getHomePath();

  src = src.replace("~", homePath);
  src = path.resolve(src);
  dist = dist.replace("~", homePath);
  dist = path.resolve(dist);

  if (!isExist(src)) {
    console.log("The src file or dir does not exist.");
    process.exit(1);
  }

  const srcStat = await promisify(fs.stat)(src);
  if (srcStat.isFile()) {
    promisify(fs.copyFile)(src, dist)
      .then(() => {
        console.log("Move file success!");
      })
      .catch(e => {
        console.log("Move file failure!", e);
      });
  }

  if (srcStat.isDirectory()) {
    const dirName = path.basename(src);

    // to get dist path
    let distDirPath: string;
    if (options.retry === false) {
      if (fs.readdirSync(dist).includes(dirName)) {
        let newName = `${dirName}(1)`;
        let i = 1;
        while (fs.readdirSync(dist).includes(newName)) {
          i = i + 1;
          newName = `${dirName}(${i})`;
          if (i > 10) {
            newName = newName + "-";
          }
          if (i > 100) {
            console.log(`The dist dir has the same dir`);
            process.exit(1);
          }
        }
        distDirPath = path.join(dist, newName);
      } else {
        distDirPath = path.join(dist, dirName);
      }
    } else {
      distDirPath = path.join(dist, dirName);
    }

    if (!fs.existsSync(distDirPath)) {
      fs.mkdirSync(distDirPath);
    }

    const tasks = walkDictionary(src);
    const allTasks = tasks.length;

    while (tasks.length > 0) {
      const scrFile = tasks.shift();
      try {
        const distFile = scrFile.replace(src, distDirPath);
        if (!fs.existsSync(distFile)) {
          safeCopyFile(scrFile, distFile);
        }
        // fs.copyFileSync(scrFile, distFile);
        console.log(
          `finish copying file ${scrFile}`,
          `process: ${(1 - tasks.length / allTasks) * 100}%`,
          `${allTasks - tasks.length}/${allTasks}`
        );
      } catch (e) {
        console.log(`copy file ${scrFile} failure`, e);
        tasks.push(scrFile);
      }
    }
  }
}

copyDirOrFile(src, dist, copyOptions);
