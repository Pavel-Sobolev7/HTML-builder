const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const componentsDir = path.join(__dirname, 'components');
const stylesDir = path.join(__dirname, 'styles');
const assetsDir = path.join(__dirname, 'assets');
const distAssetsDir = path.join(distPath, 'assets');

fs.mkdir(distPath, { recursive: true }, (err) => {
    if (err) throw err;

    fs.readFile(templatePath, 'utf-8', (err, data) => {
        if (err) throw err;

        let template = data;

        const templateTags = template.match(/{{\s*[a-zA-Z]+\s*}}/g);

        if (templateTags) {
            const replacements = templateTags.map(tag => {
                const componentName = tag.replace(/{{\s*|\s*}}/g, '');
                const componentPath = path.join(componentsDir, componentName + '.html');
                return fs.promises.readFile(componentPath, 'utf-8')
                    .then(content => {
                        template = template.replace(tag, content);
                    });
            });

            Promise.all(replacements).then(() => {
                fs.writeFile(path.join(distPath, 'index.html'), template, (err) => {
                    if (err) throw err;
                });
            });
        }
    });

    fs.readdir(stylesDir, (err, files) => {
        if (err) throw err;

        const styles = files.filter(file => path.extname(file) === '.css')
            .map(file => fs.promises.readFile(path.join(stylesDir, file), 'utf-8'));

        Promise.all(styles).then(contents => {
            fs.writeFile(path.join(distPath, 'style.css'), contents.join('\n'), (err) => {
                if (err) throw err;
            });
        });
    });

    const copyDir = (src, dest) => {
        fs.mkdir(dest, { recursive: true }, (err) => {
            if (err) throw err;

            fs.readdir(src, (err, files) => {
                if (err) throw err;

                files.forEach(file => {
                    const srcPath = path.join(src, file);
                    const destPath = path.join(dest, file);

                    fs.stat(srcPath, (err, stats) => {
                        if (err) throw err;

                        if (stats.isDirectory()) {
                            copyDir(srcPath, destPath);
                        } else {
                            fs.copyFile(srcPath, destPath, (err) => {
                                if (err) throw err;
                            });
                        }
                    });
                });
            });
        });
    };

    copyDir(assetsDir, distAssetsDir);
});