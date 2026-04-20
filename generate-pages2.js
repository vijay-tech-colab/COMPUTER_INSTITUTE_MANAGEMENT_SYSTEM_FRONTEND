const fs = require('fs');
const path = require('path');
const pages = [
  'notifications',
  'reports',
  'finance/payments',
  'library/books'
];

pages.forEach(p => {
  const dir = path.join('app/dashboard', p);
  fs.mkdirSync(dir, { recursive: true });

  const title = p.split('/').pop().replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const componentName = p.split('/').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('').replace(/-/g, '');

  const content = `import React from "react";

export default function ${componentName}Page() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-6 md:min-h-min">
        <h2 className="text-2xl font-semibold tracking-tight">${title}</h2>
        <p className="text-sm text-zinc-500 mt-2">Manage ${title} settings and data records.</p>
      </div>
    </div>
  );
}
`;

  if (!fs.existsSync(path.join(dir, 'page.tsx'))) {
    fs.writeFileSync(path.join(dir, 'page.tsx'), content);
    console.log('Created ' + dir);
  } else {
    console.log('Skipping ' + dir + ' (already exists)');
  }
});
