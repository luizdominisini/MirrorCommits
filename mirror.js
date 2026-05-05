const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// const message = execSync("git log -1 --pretty=%s").toString().trim();
const author = execSync("git log -1 --pretty=%an").toString().trim();
const date = execSync("git log -1 --pretty=%aI").toString().trim();
const repo = execSync("git rev-parse --show-toplevel").toString().trim();
const repo_name = path.basename(repo);

const PUBLIC_REPO = path.join(__dirname, process.env.REPO);
const JSON_FILE = path.join(PUBLIC_REPO, "commits.json");

//
if (process.env.REPO == repo_name) process.exit(0);

let commits = [];

if (fs.existsSync(JSON_FILE)) {
  commits = JSON.parse(fs.readFileSync(JSON_FILE));
}

commits.push({ author, repository: repo_name, date });

fs.writeFileSync(JSON_FILE, JSON.stringify(commits, null, 2));

execSync(`git -C ${PUBLIC_REPO} add commits.json`);
execSync(
  `git -C ${PUBLIC_REPO} commit -m "mirror: ${repo_name} - date: ${date}"`,
);
execSync(`git -C ${PUBLIC_REPO} push`);

console.log("Mirror feito com sucesso!");
