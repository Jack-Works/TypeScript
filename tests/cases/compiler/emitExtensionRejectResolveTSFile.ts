// @emitExtension: .mjs
// @outDir: ../out/

// @Filename: 0.ts
export default 0

// @Filename: 1.ts
import num from './0.ts'
num + 1
