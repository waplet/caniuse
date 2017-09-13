const caniuse = require('caniuse-api');

const myScope = 'ie >= 9, Firefox >= 45, Chrome >= 49, Safari >= 9, Edge >= 12';
console.log("PF's browser scope: \n", myScope, "\n");


caniuse.setBrowserScope(myScope);

if (process.argv.length < 3) {
    console.log("Please provide a feature!");
    return;
}

let features = process.argv.slice(2);
// console.log(features);

let supports = [];
features.forEach((feature) => {
    try {
        supports.push({
            feature: feature,
            browserSupport: caniuse.getSupport(feature)
        });
    } catch (e) {
        console.log(e.message);
        // skipping
    }
});

supports.forEach((support) => processSupport(support));

function processSupport(support) {
    console.log("#############");
    console.log("Feature: ", support.feature);
    console.log("Is fully supported: ", isFullySupported(support.browserSupport) ? 'Yes' : 'No');
    if (!isFullySupported(support.browserSupport)) {
        console.log("Unsupported browsers: ", getUnsupportedBrowsers(support.browserSupport).join(', '));
    }
    console.log("#############");
    console.log("\n");
}

function isFullySupported(browserSupport) {
    return Object.keys(browserSupport)
                 .filter(key => browserSupport[key].hasOwnProperty('y'))
                 .length === Object.keys(browserSupport).length;
}

function getUnsupportedBrowsers(browserSupport) {
    return Object.keys(browserSupport)
                 .filter(key => !browserSupport[key].hasOwnProperty('y'));
}

// console.log(supports);
