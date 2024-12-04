const config: any = {
    is_prod: true,
    port: 4000,
    // DB
    DB_PORT: 5432,
    DB_HOST: dbHost(),
    DB_USERNAME: dbUsername(),
    DB_PASSWORD: dbPassword(),
    DB_DATABASE: dbDATABASE(),
    DB_TYPE: "postgres",
}

function dbHost(): string {
    return config.is_prod ? '' : 'localhost'
}

function dbUsername(): string {
    return config.is_prod ? '' : 'postgres'
}

function dbPassword(): string {
    return config.is_prod ? '' : '1234root'
}

function dbDATABASE(): string {
    return config.is_prod ? '' : 'testForm'
}

export default config