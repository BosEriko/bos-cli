import arg from 'arg';
import inquirer from 'inquirer';
import { bosOptions } from './main';

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--assist': Boolean,        '-a': '--assist',
            '--directory': Boolean,     '-d': '--directory',
            '--fun': Boolean,           '-f': '--fun',
            '--help': Boolean,          '-h': '--help',
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        assist: args['--assist']        || false,
        directory: args['--directory']  || false,
        fun: args['--fun']              || false,
        help: args['--help']            || false,
    };
}

async function promptForMissingOptions(options) {
    const defaultTemplate = 'Help';
    // if (options.skipPrompts) {
    //     return {
    //         ...options,
    //         template: options.template || defaultTemplate,
    //     };
    // }

    const questions = [];
    // if (!options.template) {
    //     questions.push({
    //         type: 'list',
    //         name: 'template',
    //         message: 'Please choose which project template to use',
    //         choices: ['JavaScript', 'TypeScript'],
    //         default: defaultTemplate,
    //     });
    // }

    // if (!options.git) {
    //     questions.push({
    //         type: 'confirm',
    //         name: 'git',
    //         message: 'Initialize a git repository?',
    //         default: false,
    //     });
    // }

    let state = false;
    if (!(options.assist || options.directory || options.fun || options.help)) {
        questions.push({
            type: 'list',
            name: 'state',
            message: 'What do you need',
            choices: ['Assist', 'Directory', 'Fun', 'Help'],
            default: defaultTemplate,
        });
    } else {
        if(options.assist) {
            state = 'Assist'
        } else if(options.directory) {
            state = 'Directory'
        } else if(options.fun) {
            state = 'Fun'
        } else if(options.help) {
            state = 'Help'
        }
    }

    const answers = await inquirer.prompt(questions);
    return {
        state: state || answers.state,
        choice: 'Default',
        // template: options.template || answers.template,
        // git: options.git || answers.git,
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    console.log(options)
    // await bosOptions(options);
}