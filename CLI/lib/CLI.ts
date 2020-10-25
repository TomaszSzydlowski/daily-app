import * as program from "commander";
import * as chalk from "chalk";

const packageJson = require('../package.json');

program
    .version(packageJson.version)
    .description('Daily-app CLI')
    .command('help', '')
    .action(() => {
        program.help();
    });

program
    .command('hi')
    .action(async () => {
        try {
            console.log('hi');
        } catch (error) {
            console.error(chalk.red('\n' + error.toString() + '\n'));
            process.exit(0);
        }
    });

program.parse(process.argv);

if (!program.args.length) {
    program.help();
}