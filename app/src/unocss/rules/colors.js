import { theme as unoTheme } from '@unocss/preset-mini/theme'
import { colorResolver } from '@unocss/preset-mini/utils'

const safelist = [
  'inherit',
  'current',
  'transparent',
  'black',
  'white',
]

const noTransparency = [
  'inherit',
  'current',
  'transparent',
]

const flattenObj = (ob, separator = '.') => {
  const result = {}

  for (const i in ob)
    if ((typeof ob[ i ]) === 'object' && !Array.isArray(ob[ i ])) {
      const temp = flattenObj(ob[ i ], separator)

      for (const j in temp)
        result[ `${ i }${ separator }${ j }` ] = temp[ j ]
    }

    else
      result[ i ] = ob[ i ]

  return result
}

export const colors = [
  [ /^id-app$/,
    ([ , ], { theme }) => {
      let css = ''

      if (theme.colors) {
        let colorVars = ':root {\n'
        let colorClass = ''

        const colorsFlat = flattenObj(theme.colors, '-')
        const unoColorsFlat = flattenObj(unoTheme.colors, '-')

        const colorsMap = Object.keys(colorsFlat).filter((name) => {
          return safelist.includes(name) || unoColorsFlat[ name ] !== colorsFlat[ name ]
        })

        colorsMap.forEach((name) => {
          const bgObj = colorResolver('background-color', 'bg')([ null, name ], { theme })

          if (typeof bgObj === 'object') {
            const bgObjKeys = Object.keys(bgObj)
            const bgValue = bgObj[ bgObjKeys[ 1 ] ] || bgObj[ bgObjKeys[ 0 ] ]

            name = name.replace('-DEFAULT', '')
            colorVars += `  --color-${ name }: ${ bgValue };\n`

            colorClass += `.bg-${ name } {\n`
            colorClass += noTransparency.includes(name) ? '' : '  --un-bg-opacity: 1;\n'
            colorClass += `  background: ${ bgValue };\n`
            colorClass += '}\n'

            const textObj = colorResolver('color', 'text')([ null, name ], { theme })
            const textObjKeys = Object.keys(textObj)
            const textValue = textObj[ textObjKeys[ 1 ] ] || textObj[ textObjKeys[ 0 ] ]

            colorClass += `.text-${ name } {\n`
            colorClass += noTransparency.includes(name) ? '' : '  --un-text-opacity: 1;\n'
            colorClass += `  color: ${ textValue };\n`
            colorClass += '}\n'
          }
        })

        colorVars += '}\n'

        css = colorVars + colorClass
      }

      return css
    },
    {
      layer: 'root',
    },
  ],
]
