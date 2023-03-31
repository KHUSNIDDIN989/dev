import path from "path";
import fs from "fs";

const model = (req, _, next) => {
  req.readFile = function (fileName) {
    let files = fs.readFileSync(
      path.join(process.cwd(), "db", fileName + ".json"),
      "UTF-8"
    );
    files = files ? JSON.parse(files) : [];
    return files;
  };

  req.writeFile = function (fileName, data) {
    let file = fs.readFileSync(
      path.join(process.cwd(), "db", fileName + ".json"),
      "UTF-8"
    );

    file = file ? JSON.parse(file) : [];

    file.push(data);

    fs.writeFileSync(
      path.join(process.cwd(), "db", fileName + ".json"),
      JSON.stringify(file, null, 4)
    );
    return true;
  };
  next();
};

export default model;
