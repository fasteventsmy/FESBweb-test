export type Project = { slug:string; title:string; client?:string; date?:string; location?:string; categories?:string[]; tags?:string[]; cover:string; body?:string; status?:string };
const modules = import.meta.glob('/content/projects/**/project.md', { eager: true, as: 'raw' });
const coverGuess = (slug:string) => `/content/projects/${slug}/cover.jpg`;
function parseFrontMatter(raw:string){
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/m.exec(raw);
  if(!m) return [{}, raw];
  const yaml = m[1]; const body = m[2] || ''; const obj: any = {};
  yaml.split(/\n/).forEach(line=>{
    const mm = /^(\w+):\s*(.*)$/.exec(line.trim());
    if(mm){ const k=mm[1]; let v=mm[2].trim();
      if(v.startsWith('[')){ try{ v = JSON.parse(v.replace(/'/g,'"')); }catch{} }
      obj[k]=v.replace(/^"|"$/g,'');
    }
  }); return [obj, body];
}
export default function getProjects(): Project[] {
  const items: Project[] = [];
  for (const [path, raw] of Object.entries(modules) as any){
    const slug = path.split('/').slice(-2,-1)[0];
    const [fm, body] = parseFrontMatter(raw as string);
    items.push({ slug, title: fm.title || slug, client: fm.client, date: fm.date, location: fm.location, categories: fm.categories || [], tags: fm.tags || [], cover: fm.cover || coverGuess(slug), body, status: fm.status || 'published' });
  }
  return items.sort((a,b)=> (b.date||'').localeCompare(a.date||''));
}
