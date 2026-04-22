// DBMS Simulator - Simulates database operations and transactions

export type QueryOperation = {
  id: string;
  type: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'JOIN';
  table: string;
  query: string;
  executionTime: number; // ms
  rowsAffected: number;
  status: 'Executing' | 'Completed' | 'Error';
  timestamp: string;
};

export type Transaction = {
  id: string;
  status: 'Pending' | 'In Progress' | 'Committed' | 'Rolled Back';
  operations: QueryOperation[];
  isolationLevel: 'Read Uncommitted' | 'Read Committed' | 'Repeatable Read' | 'Serializable';
  startTime: string;
  endTime?: string;
  durability: 'Durable' | 'Volatile';
};

export type IndexOperation = {
  id: string;
  table: string;
  column: string;
  indexType: 'B-Tree' | 'Hash' | 'Full Text';
  searchTime: number; // ms
  hits: number;
  misses: number;
  timestamp: string;
};

export type LockInfo = {
  id: string;
  table: string;
  lockType: 'Shared' | 'Exclusive';
  acquiredBy: string;
  acquiredAt: string;
  holdDuration: number; // ms
};

const tables = ['Vehicle', 'Sensor', 'Sensor_Reading', 'Alert', 'Maintenance'];

const queryTemplates = {
  SELECT: [
    'SELECT * FROM {table} WHERE id = ?',
    'SELECT COUNT(*) FROM {table}',
    'SELECT * FROM {table} ORDER BY timestamp DESC LIMIT 10',
    'SELECT DISTINCT {table}.id FROM {table}',
  ],
  INSERT: [
    'INSERT INTO {table} VALUES (...)',
    'INSERT INTO {table} (id, name, status) VALUES (?, ?, ?)',
  ],
  UPDATE: [
    'UPDATE {table} SET status = ? WHERE id = ?',
    'UPDATE {table} SET timestamp = NOW() WHERE vehicle_id = ?',
  ],
  DELETE: [
    'DELETE FROM {table} WHERE id = ?',
    'DELETE FROM {table} WHERE timestamp < NOW() - INTERVAL 30 DAY',
  ],
  JOIN: [
    'SELECT * FROM {table} INNER JOIN Sensor ON {table}.id = Sensor.vehicle_id',
    'SELECT * FROM {table} LEFT JOIN Alert ON {table}.id = Alert.vehicle_id',
    'SELECT COUNT(*) FROM {table} JOIN Sensor_Reading USING (sensor_id)',
  ],
};

export function generateQueryOperation(): QueryOperation {
  const types: Array<QueryOperation['type']> = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'JOIN'];
  const type = types[Math.floor(Math.random() * types.length)];
  const table = tables[Math.floor(Math.random() * tables.length)];
  
  const templates = queryTemplates[type as keyof typeof queryTemplates];
  const baseQuery = templates[Math.floor(Math.random() * templates.length)];
  const query = baseQuery.replace('{table}', table);

  return {
    id: `QRY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    table,
    query,
    executionTime: Math.floor(Math.random() * 300) + 10,
    rowsAffected: type === 'SELECT' ? Math.floor(Math.random() * 1000) + 1 : Math.floor(Math.random() * 100),
    status: Math.random() > 0.05 ? 'Completed' : 'Executing',
    timestamp: new Date().toISOString(),
  };
}

export function generateTransaction(): Transaction {
  const operationCount = Math.floor(Math.random() * 3) + 2;
  const operations: QueryOperation[] = Array.from({ length: operationCount }, () => generateQueryOperation());
  
  const isolationLevels: Array<Transaction['isolationLevel']> = [
    'Read Uncommitted',
    'Read Committed',
    'Repeatable Read',
    'Serializable',
  ];

  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + Math.random() * 1000 + 100);

  return {
    id: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    status: Math.random() > 0.1 ? 'Committed' : Math.random() > 0.5 ? 'Rolled Back' : 'In Progress',
    operations,
    isolationLevel: isolationLevels[Math.floor(Math.random() * isolationLevels.length)],
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    durability: Math.random() > 0.2 ? 'Durable' : 'Volatile',
  };
}

export function generateIndexOperation(): IndexOperation {
  const table = tables[Math.floor(Math.random() * tables.length)];
  const columns: Record<string, string[]> = {
    Vehicle: ['id', 'health_score', 'route'],
    Sensor: ['id', 'vehicle_id', 'sensor_type'],
    Sensor_Reading: ['id', 'sensor_id', 'timestamp'],
    Alert: ['id', 'vehicle_id', 'severity'],
    Maintenance: ['id', 'vehicle_id', 'date'],
  };

  const column = columns[table]?.[Math.floor(Math.random() * 3)] || 'id';
  const indexTypes: Array<IndexOperation['indexType']> = ['B-Tree', 'Hash', 'Full Text'];

  return {
    id: `IDX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    table,
    column,
    indexType: indexTypes[Math.floor(Math.random() * indexTypes.length)],
    searchTime: Math.floor(Math.random() * 50) + 5,
    hits: Math.floor(Math.random() * 1000) + 100,
    misses: Math.floor(Math.random() * 100),
    timestamp: new Date().toISOString(),
  };
}

export function generateLockInfo(): LockInfo {
  const table = tables[Math.floor(Math.random() * tables.length)];
  const lockTypes: Array<LockInfo['lockType']> = ['Shared', 'Exclusive'];

  return {
    id: `LCK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    table,
    lockType: lockTypes[Math.floor(Math.random() * lockTypes.length)],
    acquiredBy: `Transaction-${Math.floor(Math.random() * 100)}`,
    acquiredAt: new Date().toISOString(),
    holdDuration: Math.floor(Math.random() * 500) + 50,
  };
}

export function getDBMSMetrics() {
  const queries = [generateQueryOperation(), generateQueryOperation(), generateQueryOperation()];
  const transactions = [generateTransaction(), generateTransaction()];
  const indexes = [generateIndexOperation(), generateIndexOperation()];
  const locks = [generateLockInfo()];

  const totalExecutionTime = queries.reduce((sum, q) => sum + q.executionTime, 0);
  const totalRowsAffected = queries.reduce((sum, q) => sum + q.rowsAffected, 0);
  const committedTransactions = transactions.filter(t => t.status === 'Committed').length;

  return {
    queries,
    transactions,
    indexes,
    locks,
    totalExecutionTime: totalExecutionTime.toFixed(2),
    totalRowsAffected,
    committedTransactions,
    activeTransactions: transactions.filter(t => t.status === 'In Progress').length,
    cacheHitRatio: (Math.random() * 30 + 70).toFixed(2),
  };
}

// ACID Properties visualization
export function getACIDProperties() {
  return {
    atomicity: {
      name: 'Atomicity',
      description: 'All-or-Nothing: Transactions either fully complete or fully rollback',
      status: 'Guaranteed',
      metric: Math.random() > 0.98 ? 'Last rollback 5m ago' : 'No recent rollbacks',
    },
    consistency: {
      name: 'Consistency',
      description: 'Data integrity constraints always maintained after transactions',
      status: 'Enforced',
      metric: `${(99 + Math.random()).toFixed(2)}% constraint validation`,
    },
    isolation: {
      name: 'Isolation',
      description: 'Concurrent transactions do not interfere with each other',
      status: 'Serializable',
      metric: `${Math.floor(Math.random() * 20) + 5} concurrent transactions`,
    },
    durability: {
      name: 'Durability',
      description: 'Committed transactions persist even after failures',
      status: 'Persistent',
      metric: `${(99.5 + Math.random() * 0.49).toFixed(2)}% data integrity`,
    },
  };
}
