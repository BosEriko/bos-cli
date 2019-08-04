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
    let questions = [];
    let currentState = false;
    if (!(options.assist || options.directory || options.fun || options.help)) {
        questions.push({
            type: 'list',
            name: 'state',
            message: 'What do you need',
            choices: ['Assist', 'Directory', 'Fun', 'Help'],
            default: 'Assist',
        });
    } else {
        if (options.assist) {
            currentState = 'Assist'
        } else if (options.directory) {
            currentState = 'Directory'
        } else if (options.fun) {
            currentState = 'Fun'
        } else if (options.help) {
            currentState = 'Help'
        }
    }
    const stateAnswer = await inquirer.prompt(questions);
    const state = currentState || stateAnswer.state;

    questions = [];
    switch (state) {
        case 'Assist':
            questions.push({
                type: 'list',
                name: 'choice',
                message: 'Where do you need assistance',
                choices: [
                    'Browser',
                    'Clear Bin',
                    'CPU Temperature',
                    'CPU Usage',
                    'External IP',
                    'Localhost Live',
                    'Localhost',
                    'Markdown',
                    'Ngrok',
                    'NPM List',
                    'NPM Outdated',
                    'NPM Update',
                    'Qutebrowser',
                    'Restart ZSH',
                    'Restart',
                    'Shut Down',
                    'SSH Key',
                    'Visual Studio Extension Backup',
                    'Visual Studio Extension Install',
                ],
                default: 'Browser',
            });
            break;
        case 'Directory':
            questions.push({
                type: 'list',
                name: 'choice',
                message: 'In which directory do you want to go',
                choices: [
                    'CLI',
                    'Dotfiles',
                    'Personal',
                    'Work',
                ],
                default: 'CLI',
            });
            break;
        case 'Fun':
            questions.push({
                type: 'list',
                name: 'choice',
                message: 'Which do you want to play',
                choices: [
                    'Parrot Say',
                    'Party Parrot',
                ],
                default: 'Parrot Say',
            });
            break;
    }
    const choiceAnswer = await inquirer.prompt(questions);
    const choice = state === 'Help' ? state : choiceAnswer.choice;

    return {
        state: state,
        choice: choice,
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await bosOptions(options);
}