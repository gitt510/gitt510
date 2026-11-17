import { buttons } from './buttons'
import { dataDisplay } from './dataDisplay'
import { feedback } from './feedback'
import { inputs } from './inputs'
import { others } from './others'
import type { Demo } from './playground'
import { toggles } from './toggles'

// Add a demo to a category file and it shows up in the nav and gets its own page
export const demos: Demo[] = [...inputs, ...buttons, ...toggles, ...dataDisplay, ...feedback, ...others]

export const categories = [...new Set(demos.map((d) => d.category))]
