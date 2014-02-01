# karma-jsx-preprocessor

[![Build Status](https://travis-ci.org/maksimr/karma-jsx-preprocessor.png?branch=master)](https://travis-ci.org/maksimr/karma-jsx-preprocessor) [![Build Status](https://drone.io/github.com/maksimr/karma-jsx-preprocessor/status.png)](https://drone.io/github.com/maksimr/karma-jsx-preprocessor/latest)

> Preprocessor for server side javascript

## Installation

The easiest way is to keep `karma-jsx-preprocessor` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-jsx-preprocessor": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-jsx-preprocessor --save-dev
```

## Configuration
Following code shows the default configuration...
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jsx'],
    preprocessors: {
      '**/*.jsx': ['jsx']
    }
  });
};
```

Define project directory
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jsx'],
    preprocessors: {
      '**/*.jsx': ['jsx']
    },
    jsx: {
        projectDir: 'mail'
    }
  });
};
```

Now you can include file by path `projectDir/<originalFilePath>`

## Usage

```js
it('should include server module', function() {
    var system = new jsx.System();
    expect(system.include('projectDir/test/server/fixture/foo.jsx')).to.be.equal('Hello World');
});

it('should include server module and eval it in special context', function() {
    var system = new jsx.System();
    var barModule = system.include('projectDir/test/server/fixture/bar.jsx', {
        User: {
            name: 'Guest'
        }
    });

    expect(barModule()).to.be.equal('Hello Guest');
});
```

See **test/server/unit** and **karma-test.conf.js**

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
