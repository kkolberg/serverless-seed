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
        reporters: ["progress", "karma-typescript", "junit", "coverage"],
        browsers: ['PhantomJS'],
        junitReporter: {
            outputDir: 'coverage',
            useBrowserName: false,
            outputFile: 'junit/TESTS-RESULT.xml'
        },
        coverageReporter: {
            dir: 'coverage',
            subdir: '.',
            reporters: [
                { type: 'lcov', subdir: 'report-lcov' }
            ]
        }
    });
};