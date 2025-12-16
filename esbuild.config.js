import * as esbuild from 'esbuild';
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDev = process.argv.includes('--dev');

// Build configuration
const buildConfig = {
  entryPoints: ['src/scripts/main.ts'],
  bundle: true,
  minify: !isDev,
  sourcemap: isDev,
  target: 'es2020',
  format: 'esm',
  outdir: 'dist/js',
  splitting: true,
  chunkNames: 'chunks/[name]-[hash]',
  assetNames: 'assets/[name]-[hash]',
  metafile: true,
  logLevel: 'info',
};

// Recursive directory copy function
function copyDirSync(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  const entries = readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

async function build() {
  try {
    console.log(`🚀 Building in ${isDev ? 'DEVELOPMENT' : 'PRODUCTION'} mode...`);

    // Build JavaScript/TypeScript
    const result = await esbuild.build(buildConfig);

    // Create dist directory
    if (!existsSync('dist')) {
      mkdirSync('dist', { recursive: true });
    }

    // Copy index.html to dist
    copyFileSync('src/index.html', 'dist/index.html');
    console.log('✅ Copied index.html to dist/');

    // Copy CSS files
    if (!existsSync('dist/css')) {
      mkdirSync('dist/css', { recursive: true });
    }
    copyFileSync('src/styles/main.css', 'dist/css/main.css');
    console.log('✅ Copied CSS files to dist/css/');

    // Copy public assets
    if (existsSync('public')) {
      copyDirSync('public', 'dist');
      console.log('✅ Copied public assets to dist/');
    }

    console.log('✨ Build completed successfully!');

    if (isDev) {
      console.log('\n📦 Dev build ready. Run `npm run preview` to view the site');
    } else {
      console.log('\n📦 Production build ready in dist/');
      console.log('\n📊 Build stats:');
      if (result.metafile) {
        const outputs = Object.keys(result.metafile.outputs);
        let totalSize = 0;
        outputs.forEach(output => {
          const size = result.metafile.outputs[output].bytes;
          totalSize += size;
          console.log(`  ${output}: ${(size / 1024).toFixed(2)} KB`);
        });
        console.log(`  Total JS: ${(totalSize / 1024).toFixed(2)} KB`);
      }
    }

  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
