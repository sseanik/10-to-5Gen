export const isNavActive = (pathname: string, to: string) => {
  if (pathname === '/' && to === '/meetings') return true;

  const parsedPathName = pathname.includes('mock') ? pathname.replace('/mock', '') : pathname;

  const lastSlashIndex = parsedPathName.slice(1).lastIndexOf('/');

  if (lastSlashIndex !== -1) {
    return parsedPathName.substring(0, lastSlashIndex + 1) === to;
  }

  return parsedPathName === to;
};
