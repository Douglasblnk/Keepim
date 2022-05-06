import { extractorSplit } from '@unocss/core'
import { autocompleteExtractorAttributify } from '@unocss/preset-attributify'
import { colors } from './rules/colors'

import theme from './theme'

const preset = (options = {}) => {
  options.strict = options.strict ?? false
  options.prefix = options.prefix ?? 'un-'
  options.prefixedOnly = options.prefixedOnly ?? false
  options.nonValuedAttribute = options.nonValuedAttribute ?? true
  options.ignoreAttributes = options.ignoreAttributes ?? []

  const extractors = [
    extractorSplit,
  ]

  const autocompleteExtractors = [
    autocompleteExtractorAttributify,
  ]

  const rules = [
    ...colors,
  ]

  return {
    name: 'preset-multiplier-core',
    layers: {
      root: -99,
    },
    theme,
    rules,
    extractors,
    options,
    autocomplete: {
      extractors: autocompleteExtractors,
    },
  }
}

export default preset
