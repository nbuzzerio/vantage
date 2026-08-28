import Dexie, { type EntityTable } from 'dexie'
import type {
  AppSetting,
  AssessmentSnapshot,
  DomainDefinition,
  DomainProgress,
  EvidenceRecord,
  ReflectionRecord,
} from '../models/domain'

class VantageDatabase extends Dexie {
  domainDefinitions!: EntityTable<DomainDefinition, 'id'>
  domainProgress!: EntityTable<DomainProgress, 'domainId'>
  assessments!: EntityTable<AssessmentSnapshot, 'id'>
  evidence!: EntityTable<EvidenceRecord, 'id'>
  reflections!: EntityTable<ReflectionRecord, 'id'>
  appSettings!: EntityTable<AppSetting, 'key'>

  constructor() {
    super('vantage')
    this.version(1).stores({
      domainDefinitions: 'id',
      domainProgress: 'domainId, status, installedAt',
      assessments: 'id, domainId, assessedAt',
      evidence: 'id, domainId, branchId, benchmarkId, createdAt',
      reflections: 'id, domainId, createdAt',
      appSettings: 'key',
    })
  }
}

export const database = new VantageDatabase()
