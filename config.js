const { FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_DEST, FTP_URI } = process.env;

module.exports = {
    title: 'Зверовоз',
    description: 'Безопасные перевозки животных по России и миру',
    authors: [
        {
            name: 'Рахиб',
            job: 'Frontend-developer',
            contacts: [
                {
                    title: '@t.me/rxbweb',
                    href: 'https://t.me/rxbweb',
                },
                {
                    title: 'rxpro700@gmail.com',
                    href: 'mailto:rxpro700@gmail.com',
                },
            ],
        },
    ],
    ftp: {
        default: {
            host: FTP_HOST,
            user: FTP_USER,
            password: FTP_PASSWORD,
            dest: FTP_DEST,
            uri: FTP_URI,
        },
    },
    presets: {
        deploy: {
            babel: true,
            compress: true,
            mode: 'build',
            abstract: true,
        },
        dev: {
            debug: true,
            sourcemaps: {
                js: true,
            },
        },
    },
};
