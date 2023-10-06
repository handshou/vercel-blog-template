/**
 * @type {import('astro').ClientDirective}
 */
export default (load, opts, el) => {
  const isEditor = window.top.location.pathname.startsWith('/admin')
  if (isEditor) {
    load().then(hydrate => hydrate())
  }
}

