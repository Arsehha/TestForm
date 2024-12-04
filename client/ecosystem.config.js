module.exports = {
    apps: [
        {
            name: 'TF_Client',
            exec_mode: 'cluster',
            instances: 'max',
            script: "node_modules/nuxt-start/bin/nuxt-start.js",
            args: 'start'
        }
    ]
}
