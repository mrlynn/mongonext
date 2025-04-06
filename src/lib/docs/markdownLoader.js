import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

// Configure marked with GitHub Flavored Markdown
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false,
  sanitize: false
});

/**
 * Load a markdown file from the docs directory
 * @param {string} filePath - Path to the markdown file relative to the docs directory
 * @returns {Promise<{content: string, frontmatter: Object}>} - Parsed markdown content and frontmatter
 */
export async function loadMarkdownFile(filePath) {
  try {
    // Construct the full path to the file
    const fullPath = path.join(process.cwd(), 'docs', filePath);
    
    // Read the file content
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    
    // Parse the markdown content
    const content = marked(fileContent);
    
    // For now, we'll return an empty frontmatter object
    // In a more advanced implementation, we could parse frontmatter using a library like gray-matter
    return {
      content,
      frontmatter: {}
    };
  } catch (error) {
    console.error(`Error loading markdown file: ${filePath}`, error);
    return {
      content: '<p>Error loading documentation content.</p>',
      frontmatter: {}
    };
  }
}

/**
 * Get all documentation files
 * @returns {Promise<Array<{path: string, title: string}>>} - List of documentation files
 */
export async function getAllDocs() {
  try {
    const docsDir = path.join(process.cwd(), 'docs');
    const docs = [];
    
    // Recursively get all markdown files
    function getMarkdownFiles(dir, basePath = '') {
      const files = fs.readdirSync(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          getMarkdownFiles(filePath, path.join(basePath, file));
        } else if (file.endsWith('.md') && file !== 'README.md') {
          const relativePath = path.join(basePath, file.replace('.md', ''));
          const title = file
            .replace('.md', '')
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          docs.push({
            path: relativePath,
            title
          });
        }
      });
    }
    
    getMarkdownFiles(docsDir);
    return docs;
  } catch (error) {
    console.error('Error getting documentation files:', error);
    return [];
  }
} 