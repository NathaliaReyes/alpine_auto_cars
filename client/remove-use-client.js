import fs from 'fs';
import path from 'path';

const dirs = [
  '@radix-ui/react-accordion',
  '@radix-ui/react-avatar',
  '@radix-ui/react-collapsible',
  '@radix-ui/react-collection',
  '@radix-ui/react-dialog',
  '@radix-ui/react-dismissable-layer',
  '@radix-ui/react-focus-guards',
  '@radix-ui/react-focus-scope',
  '@radix-ui/react-hover-card',
  '@radix-ui/react-label',
  '@radix-ui/react-navigation-menu',
  '@radix-ui/react-popper',
  '@radix-ui/react-portal',
  '@radix-ui/react-presence'
];

dirs.forEach(dir => {
  const dirPath = path.join('node_modules', dir);
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(file => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('"use client"')) {
          content = content.replace(/"use client";/g, '');
          fs.writeFileSync(filePath, content);
          console.log(`Removed "use client" from ${filePath}`);
        }
      }
    });
  } else {
    console.log(`Directory not found: ${dirPath}, skipping...`);
  }
});
