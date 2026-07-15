CREATE TABLE IF NOT EXISTS card_keys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  batch_id TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'used', 'disabled')),
  used_at TEXT,
  used_by_product TEXT,
  used_user_agent TEXT,
  used_ip_hash TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_card_keys_status ON card_keys(status);
CREATE INDEX IF NOT EXISTS idx_card_keys_batch_id ON card_keys(batch_id);

CREATE TABLE IF NOT EXISTS redemption_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL,
  product TEXT,
  success INTEGER NOT NULL,
  reason TEXT,
  ip_hash TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_redemption_logs_code ON redemption_logs(code);
CREATE INDEX IF NOT EXISTS idx_redemption_logs_created_at ON redemption_logs(created_at);
