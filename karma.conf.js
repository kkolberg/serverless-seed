module.exports = function (config) {
    config.set({

        frameworks: ["mocha", "karma-typescript"],
        files: [
            { pattern: "node_modules/expect.js/index.js" },
            { pattern: "src/**/!(handler).ts" },
            { pattern: "test/**/*.ts" }
        ],

        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },

        karmaTypescriptConfig: {
            reports:
            {
                "html": "coverage/html",
                "text-summary": "",
                "json": "coverage/json",
                "lcovonly": "coverage/lcovonly"
            }
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ['PhantomJS']
    });
};