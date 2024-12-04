module.exports = {
    apps: [
        {
            name: 'TF_Server',
            script: './node_modules/.bin/ts-node',
            exec_mode: 'cluster',
            instances: 'max',
            args: 'index.ts'
        },
    ],
};