import arg from 'arg';
import inquirer from 'inquirer';

function parseArgumentsIntoOptions(rawArgs) {

}

async function promptForMissingOptions(options) {
    const defaultTemplate = 'JavaScript';
    if (options.skipPrompts) {
    return {
        ...options,
        template: options.template || defaultTemplate,
    };
    }

    const questions = [];
    if (!options.template) {
    questions.push({
        type: 'list',
        name: 'template',
        message: 'Please choose which project template to use',
        choices: ['JavaScript', 'TypeScript'],
        default: defaultTemplate,
    });
    }

    if (!options.git) {
    questions.push({
        type: 'confirm',
        name: 'git',
        message: 'Initialize a git repository?',
        default: false,
    });
    }

    const answers = await inquirer.prompt(questions);
    return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    console.log(options);
}