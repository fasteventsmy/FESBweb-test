// BEFORE
// const modules = import.meta.glob('/content/projects/**/project.md', { eager: true, as: 'raw' });

// AFTER
const modules = import.meta.glob('/content/projects/**/project.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});
