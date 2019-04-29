import { IThemedToken } from "../themedTokenizer";

interface SVGRendererOptions {
  langId?: string
  bg?: string
  fontSize: number
}

const LINE_HEIGHT_MULTIPLIER = 1.2

export function renderToSVG(lines: IThemedToken[][], options: SVGRendererOptions = { fontSize: 16 }) {
  const bg = options.bg || '#fff'

  let svg = ''

  svg += `<svg class="shiki shiki-svg" style="background-color: ${bg}; height: ${lines.length * options.fontSize * LINE_HEIGHT_MULTIPLIER}">\n`

  svg += '<g>'
  lines.forEach((l: IThemedToken[], index: number) => {
    if (l.length === 0) {
      svg += `\n`
    } else {
      svg += `<text y="${options.fontSize * LINE_HEIGHT_MULTIPLIER * (index + 1)}">\n`
      l.forEach(token => {
        svg += `<tspan style="fill: ${token.color}">${escapeHtml(token.content)}</tspan>`
      })
      svg += `\n</text>\n`
    }
  })
  svg = svg.replace(/\n*$/, '') // Get rid of final new lines

  svg += '</g>'
  svg += '\n</svg>\n'

  svg += styling
  return svg
}

function escapeHtml(html: string) {
  return html.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const styling = `
<style>
svg {
  font-family: 'Input Mono';
  padding: 12px 32px;
  width: 100%;
}
svg tspan {
  white-space: pre;
}
</style>
`