requirejs.config({
    baseUrl: 'build',
    paths: {
        app: './app'
    }
});

requirejs(['app/main']);
