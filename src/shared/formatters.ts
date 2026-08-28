import type { BranchFocusStatus, DomainLifecycleStatus } from '../models/domain'

const domainStatusLabels: Record<DomainLifecycleStatus, string> = {
  'active-focus': 'Active Focus',
  normal: 'Normal',
  maintenance: 'Maintenance',
  paused: 'Paused',
}

const branchFocusLabels: Record<BranchFocusStatus, string> = {
  normal: 'Normal',
  priority: 'Priority',
  bottleneck: 'Bottleneck',
}

export const formatDomainStatus = (status: DomainLifecycleStatus) => domainStatusLabels[status]
export const formatBranchFocus = (focus: BranchFocusStatus) => branchFocusLabels[focus]
