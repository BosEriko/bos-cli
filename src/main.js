import execa from 'execa';

export async function bosOptions(options) {
    if (options.state === 'Assist') {
        console.log(1);
    } else if (options.state === 'Directory') {
        console.log(2);
    } else if (options.state === 'Fun') {
        console.log(3);
    } else if (options.state === 'Help') {
        console.log(4);
    }
}