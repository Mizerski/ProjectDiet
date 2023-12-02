import { readFileSync } from "fs";

const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));

const dependencies = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
};

for (const [name, version] of Object.entries(dependencies)) {
  if (version.startsWith("^") || version.startsWith("~")) {
    console.error(
      `A dependência "${name}" não está usando uma versão fixa: "${version}"`
    );
    process.exit(1);
  }
}
