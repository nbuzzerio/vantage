export const domainLifecycleStatuses = [
  'active-focus',
  'normal',
  'maintenance',
  'paused',
] as const

export type DomainLifecycleStatus = (typeof domainLifecycleStatuses)[number]

export const branchFocusStatuses = ['normal', 'priority', 'bottleneck'] as const

export type BranchFocusStatus = (typeof branchFocusStatuses)[number]

export type CapabilityLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface Benchmark {
  id: string
  title: string
  description?: string
  subskillId?: string
}

export interface Subskill {
  id: string
  name: string
  description?: string
}

export interface BranchDefinition {
  id: string
  name: string
  description: string
  subskills?: Subskill[]
  benchmarks: Benchmark[]
}

export interface DomainDefinition {
  schemaVersion: 1
  id: string
  name: string
  description: string
  northStar?: string
  branches: BranchDefinition[]
}

export interface BranchProgress {
  branchId: string
  focus: BranchFocusStatus
  targetLevel?: CapabilityLevel
}

export interface DomainProgress {
  schemaVersion: 1
  domainId: string
  status: DomainLifecycleStatus
  branches: BranchProgress[]
  installedAt: string
}

export interface BranchAssessmentSnapshot {
  branchId: string
  level: CapabilityLevel
  focus: BranchFocusStatus
  rationale?: string
  benchmarkIds?: string[]
  evidenceIds?: string[]
}

export interface AssessmentSnapshot {
  id: string
  schemaVersion: 1
  domainId: string
  assessedAt: string
  branchSnapshots: BranchAssessmentSnapshot[]
  overallReflection?: string
  nextReassessmentDate?: string
}

export interface EvidenceRecord {
  id: string
  schemaVersion: 1
  domainId: string
  branchId: string
  subskillId?: string
  benchmarkId?: string
  createdAt: string
  note: string
  source?: string
}

export type ReflectionTarget =
  | { type: 'domain' }
  | { type: 'branch'; branchId: string }
  | { type: 'benchmark'; branchId: string; benchmarkId: string }
  | { type: 'assessment'; assessmentId: string }

export interface ReflectionRecord {
  id: string
  schemaVersion: 1
  domainId: string
  target: ReflectionTarget
  createdAt: string
  note: string
}

export interface AppSetting {
  key: string
  value: unknown
}

export interface InstalledDomain {
  definition: DomainDefinition
  progress: DomainProgress
}
