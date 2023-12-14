import { join } from "path";
import * as fs from "fs";

export async function saveFile(file : File, fileName: string) {
  if (!file) {
    throw new Error("Missing/Invalid File!");
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const dir = join(process.cwd(), '/public');
  const path = join(dir, fileName);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(path);
  }
  fs.writeFile(path, buffer, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
