import exec from 'executive'

export async function bosOptions(options) {
    if (options.state === 'Assist') {
        exec(`figlet '${options.state}'`)
    } else if (options.state === 'Directory') {
        exec(`figlet '${options.state}'`)
    } else if (options.state === 'Fun') {
        switch (options.choice) {
            case 'Parrot Say':
                exec(`figlet 'Parrot Say'`)
                break;
            case 'Party Parrot':
                exec(`figlet 'Party Parrot'`)
                break;
        }
    } else if (options.state === 'Help') {
        exec(`figlet '${options.state}'`)
    }
}