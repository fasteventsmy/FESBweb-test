export type Project = {
  slug: string;
  title: string;
  client?: string;
  date?: string;
  location?: string;
  categories?: string[];
  tags?: string[];
  cover: string;
  body?: string;
  status?: string;
};

const modules = import.meta.glob('/content/projects/**/project.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const coverGuess = (slug: string) => `/content/projects/${slug}/cover.jpg`;

function parseFrontMatter(raw: string) {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/m.exec(raw);
  if (!m) return [{}, raw];
  const yaml = m[1];
  const body = m[2] || '';
  const obj: any = {};
  yaml.split(/\n/).forEach((line) => {
    const mm = /^(\w+):\s*(.*)$/.exec(line.trim());
    if (mm) {
      const k = mm[1];
      let v: any = mm[2].trim();
      if (/^[\[{]/.test(v)) {
        try {
          const parsed = JSON.parse(v.replace(/'/g, '"'));
          if (typeof parsed === 'object' && parsed !== null) {
            v = parsed;
          }
        } catch {}
      }
      if (typeof v === 'object' && v !== null) {
        obj[k] = v;
      } else {
        obj[k] = String(v).replace(/^"|"$/g, '');
      }
    }
  });
  return [obj, body];
}

export default function getProjects(): Project[] {
  const items: Project[] = [];
  for (const [path, raw] of Object.entries(modules) as any) {
    const slug = path.split('/').slice(-2, -1)[0];
    const [fm, body] = parseFrontMatter(raw as string);
    const rawCategories = fm.categories;
    const categories = Array.isArray(rawCategories)
      ? rawCategories.filter((category: unknown): category is string => typeof category === 'string')
      : typeof rawCategories === 'string'
        ? (() => {
            const trimmed = rawCategories.trim();
            if (!trimmed) return [];
            if (/^[\[{]/.test(trimmed)) {
              try {
                const parsed = JSON.parse(trimmed.replace(/'/g, '"'));
                if (Array.isArray(parsed)) {
                  return parsed.filter((category): category is string => typeof category === 'string');
                }
                return [];
              } catch {
                return [];
              }
            }
            return [trimmed];
          })()
        : [];
    const cover = typeof fm.cover === 'string' ? fm.cover.trim() : '';

    items.push({
      slug,
      title: fm.title || slug,
      client: fm.client,
      date: fm.date,
      location: fm.location,
      categories,
      tags: fm.tags || [],
      cover: cover || coverGuess(slug),
      body,
      status: fm.status || 'published',
    });
  }
  return items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}
