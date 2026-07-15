#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomInt } from 'node:crypto'

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const DEFAULT_PREFIX = 'LOVE'
const DEFAULT_COUNT = 100
const INSERT_CHUNK_SIZE = 500
const KNOWN_FLAGS = new Set(['batch', 'count', 'prefix', 'force', 'help'])

const scriptDir = dirname(fileURLToPath(import.meta.url))
const workerDir = dirname(scriptDir)
const repoRoot = dirname(workerDir)
const cardBatchesDir = resolve(repoRoot, 'z-rubbish', 'card-batches')

try {
  const args = parseArgs(process.argv.slice(2))

  if (args.help) {
    printHelp()
    process.exit(0)
  }

  const count = parseCount(args.count ?? args._[0] ?? DEFAULT_COUNT)
  const batchId = normalizeBatchId(args.batch ?? args._[1] ?? makeDefaultBatchId())
  const prefix = normalizePrefix(args.prefix ?? DEFAULT_PREFIX)
  const shouldForce = Boolean(args.force)

  mkdirSync(cardBatchesDir, { recursive: true })

  const codes = generateCodes(count, prefix)
  const sqlPath = join(cardBatchesDir, `${batchId}.sql`)
  const txtPath = join(cardBatchesDir, `${batchId}.txt`)

  assertCanWrite(sqlPath, shouldForce)
  assertCanWrite(txtPath, shouldForce)

  writeFileSync(sqlPath, buildSql(codes, batchId), 'utf8')
  writeFileSync(txtPath, `${codes.join('\n')}\n`, 'utf8')

  console.log(`Generated ${codes.length} card keys`)
  console.log(`Batch: ${batchId}`)
  console.log(`SQL: ${sqlPath}`)
  console.log(`TXT: ${txtPath}`)
} catch (error) {
  console.error(`Error: ${error.message}`)
  console.error('Run with --help for usage.')
  process.exit(1)
}

function parseArgs(argv) {
  const parsed = { _: [] }

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (!arg.startsWith('--')) {
      parsed._.push(arg)
      continue
    }

    const [rawKey, rawValue] = arg.slice(2).split('=')
    const key = rawKey.trim()
    if (!KNOWN_FLAGS.has(key)) {
      throw new Error(`Unknown flag --${key}`)
    }

    if (key === 'force' || key === 'help') {
      parsed[key] = true
      continue
    }

    if (rawValue !== undefined) {
      if (!rawValue) throw new Error(`Missing value for --${key}`)
      parsed[key] = rawValue
      continue
    }

    const next = argv[i + 1]
    if (!next || next.startsWith('--')) {
      throw new Error(`Missing value for --${key}`)
    }

    parsed[key] = next
    i += 1
  }

  return parsed
}

function parseCount(value) {
  const count = Number(value)
  if (!Number.isInteger(count) || count < 1 || count > 10000) {
    throw new Error('Count must be an integer between 1 and 10000')
  }
  return count
}

function normalizeBatchId(value) {
  const batchId = String(value || '').trim().toLowerCase()
  if (!/^[a-z0-9][a-z0-9_-]{1,62}[a-z0-9]$/.test(batchId)) {
    throw new Error('Batch id must be 3-64 chars: lowercase letters, numbers, _ or -')
  }
  return batchId
}

function normalizePrefix(value) {
  const prefix = String(value || '').trim().toUpperCase()
  if (!/^[A-Z]{2,8}$/.test(prefix)) {
    throw new Error('Prefix must be 2-8 uppercase letters')
  }
  return prefix
}

function makeDefaultBatchId() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `xhs-${y}${m}${d}-a`
}

function assertCanWrite(path, shouldForce) {
  if (!shouldForce && existsSync(path)) {
    throw new Error(`${path} already exists. Use --force to overwrite.`)
  }
}

function generateCodes(count, prefix) {
  const codes = new Set()
  while (codes.size < count) {
    codes.add(`${prefix}-${randomSegment()}-${randomSegment()}-${randomSegment()}`)
  }
  return Array.from(codes).sort()
}

function randomSegment() {
  let segment = ''
  for (let i = 0; i < 4; i += 1) {
    segment += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)]
  }
  return segment
}

function buildSql(codes, batchId) {
  const statements = []

  for (let i = 0; i < codes.length; i += INSERT_CHUNK_SIZE) {
    const chunk = codes.slice(i, i + INSERT_CHUNK_SIZE)
    const values = chunk
      .map(code => `  ('${escapeSql(code)}', '${escapeSql(batchId)}', 'active')`)
      .join(',\n')

    statements.push(`INSERT INTO card_keys (code, batch_id, status)\nVALUES\n${values};`)
  }

  statements.push(`SELECT batch_id, COUNT(*) AS count FROM card_keys WHERE batch_id = '${escapeSql(batchId)}' GROUP BY batch_id;`)

  return `${statements.join('\n\n')}\n`
}

function escapeSql(value) {
  return String(value).replaceAll("'", "''")
}

function printHelp() {
  console.log(`Usage:
  node scripts/generate-cardkeys.js [count] [batch] [--prefix LOVE] [--force]
  node scripts/generate-cardkeys.js --count 100 --batch xhs-20260617-a --prefix LOVE

Outputs:
  z-rubbish/card-batches/<batch>.sql  Import into Cloudflare D1
  z-rubbish/card-batches/<batch>.txt  Plain card keys for delivery

Notes:
  - Output stays in the repo-ignored temporary area instead of the Worker source tree.
  - Existing output files are not overwritten unless --force is set.
  - Production imports use INSERT, not INSERT OR IGNORE, so duplicate card keys fail loudly.
  - Card keys use three 4-character random segments, e.g. LOVE-ABCD-EFGH-JKLM.
`)
}
