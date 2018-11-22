//production & development variables

//SECRET is part of the hashing algorithm
const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.PG_CONNECTION_STRING,
        SALT_I: process.env.SALT_I
    },
    default: {
        SECRET: 'SUPERSECRETPASSWORD123',
        DATABASE: '127.0.0.1',
        SALT_I: 10
    }
}


exports.get = function get(env){
    return config[env] || config.default
}