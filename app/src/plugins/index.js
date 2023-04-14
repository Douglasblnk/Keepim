const PLUGINS = import.meta.glob([ './*.js', '!**/index.js' ], { eager: true })

export function applyPlugins(app) {
  return Object.values(PLUGINS).map(i => i.install?.(app))
}
