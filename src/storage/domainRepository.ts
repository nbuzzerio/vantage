import type { DomainDefinition, DomainProgress, InstalledDomain } from '../models/domain'
import { domainDefinitionSchema, domainProgressSchema } from '../models/schemas'
import { database } from './database'

export type InstallDomainResult = 'installed' | 'already-installed'

export interface DomainRepository {
  listInstalled(): Promise<InstalledDomain[]>
  getInstalled(domainId: string): Promise<InstalledDomain | undefined>
  install(definition: DomainDefinition): Promise<InstallDomainResult>
}

class DexieDomainRepository implements DomainRepository {
  async listInstalled(): Promise<InstalledDomain[]> {
    const progressRecords = await database.domainProgress.orderBy('installedAt').toArray()
    const installed = await Promise.all(
      progressRecords.map(async (rawProgress) => {
        const progress = domainProgressSchema.parse(rawProgress)
        const rawDefinition = await database.domainDefinitions.get(progress.domainId)
        if (!rawDefinition) return undefined
        return {
          definition: domainDefinitionSchema.parse(rawDefinition),
          progress,
        }
      }),
    )

    return installed.filter((domain): domain is InstalledDomain => domain !== undefined)
  }

  async getInstalled(domainId: string): Promise<InstalledDomain | undefined> {
    const [rawDefinition, rawProgress] = await Promise.all([
      database.domainDefinitions.get(domainId),
      database.domainProgress.get(domainId),
    ])
    if (!rawDefinition || !rawProgress) return undefined

    return {
      definition: domainDefinitionSchema.parse(rawDefinition),
      progress: domainProgressSchema.parse(rawProgress),
    }
  }

  async install(input: DomainDefinition): Promise<InstallDomainResult> {
    const definition = domainDefinitionSchema.parse(input)

    return database.transaction(
      'rw',
      database.domainDefinitions,
      database.domainProgress,
      async () => {
        const existing = await database.domainDefinitions.get(definition.id)
        if (existing) return 'already-installed'

        const progress: DomainProgress = {
          schemaVersion: 1,
          domainId: definition.id,
          status: 'normal',
          branches: definition.branches.map((branch) => ({
            branchId: branch.id,
            focus: 'normal',
          })),
          installedAt: new Date().toISOString(),
        }

        domainProgressSchema.parse(progress)
        await database.domainDefinitions.add(definition)
        await database.domainProgress.add(progress)
        return 'installed'
      },
    )
  }
}

export const domainRepository: DomainRepository = new DexieDomainRepository()
