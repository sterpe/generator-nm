'use strict';
const yeoman = require('yeoman-generator');
const _s = require('underscore.string');

module.exports = yeoman.Base.extend({
  init() {
    const cb = this.async();
    const self = this;

    this.prompt([{
      name: 'moduleName',
      message: 'What do you want to name your module?',
      default: this.appname.replace(/\s/g, '-'),
      filter: x => _s.slugify(x)
    }], props => {
      const tpl = {
        moduleName: props.moduleName,
        camelModuleName: _s.camelize(props.moduleName),
        name: self.user.git.name(),
        email: self.user.git.email(),
      };

      const mv = (from, to) => {
        self.fs.move(self.destinationPath(from), self.destinationPath(to));
      };

      self.fs.copyTpl([
        `${self.templatePath()}/**`
      ], self.destinationPath(), tpl);

      mv('editorconfig', '.editorconfig');
      mv('gitattributes', '.gitattributes');
      mv('gitignore', '.gitignore');
      mv('travis.yml', '.travis.yml');
      mv('_package.json', 'package.json');
      mv('_Makefile', 'Makefile');
      mv('flowconfig', '.flowconfig');
      mv('jestrc', '.jestrc');
      mv('babelrc', '.babelrc');
      mv('nvmrc', '.nvmrc');
      mv('npmrc', '.npmrc');
      mv('_README.md', 'README.md');
      mv('testsetup.js', 'scripts/testsetup.js');
      mv('set_environment.sh', 'scripts/set_environment.sh');
      mv('-test.js', '__tests__/-test.js');

      cb();
    });
  },
  git() {
    this.spawnCommandSync('git', ['init']);
  },
  end() {
    this.spawnCommandSync('mkdir', ['-p', 'src', '__mocks__']);
    this.spawnCommandSync('touch', ['index.js']);
  }
});
