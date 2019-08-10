import exec from 'executive'

export async function bosOptions(options) {
    if (options.state === 'Assist') {
        exec(`figlet '${options.state}'`);
    } else if (options.state === 'Fun') {
        switch (options.choice) {
            case 'Parrot Say':
                exec(`parrotsay`);
                break;
            case 'Party Parrot':
                exec(`curl parrot.live`);
                break;
        }
    } else if (options.state === 'Help') {
        exec(`figlet 'El Psy Congroo!'`).then(() => {
            console.log('\n\nThis is a CLI for my personal needs.\n\n');
        });
    }
}