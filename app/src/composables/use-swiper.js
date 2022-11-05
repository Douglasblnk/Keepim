import { Swiper } from 'swiper'

import 'swiper/css'

const defaultSwiper = {
  slidesPerView: 'auto',
  spaceBetween: 10,
  grabCursor: true,
}

async function setupDependencies(dependency, options) {
  if (!dependency.length)
    return options

  const dependencies = []

  for (const dep of dependency)
    dependencies.push((await import('swiper'))[ dep ])

  return {
    ...options,
    modules: dependencies,
  }
}

export default async function useSwiper(
  container,
  options = defaultSwiper,
  dependency = [],
) {
  return new Swiper(
    container,
    await setupDependencies(dependency, options),
  )
}
