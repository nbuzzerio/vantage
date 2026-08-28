import { z } from 'zod'
import { branchFocusStatuses, domainLifecycleStatuses } from './domain'

const stableIdSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase, hyphenated stable ID')

const benchmarkSchema = z.object({
  id: stableIdSchema,
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  subskillId: stableIdSchema.optional(),
})

const subskillSchema = z.object({
  id: stableIdSchema,
  name: z.string().min(1),
  description: z.string().min(1).optional(),
})

const branchDefinitionSchema = z
  .object({
    id: stableIdSchema,
    name: z.string().min(1),
    description: z.string().min(1),
    subskills: z.array(subskillSchema).min(1).optional(),
    benchmarks: z.array(benchmarkSchema).min(1),
  })
  .superRefine((branch, context) => {
    const subskillIds = new Set(branch.subskills?.map((subskill) => subskill.id) ?? [])

    branch.benchmarks.forEach((benchmark, index) => {
      if (benchmark.subskillId && !subskillIds.has(benchmark.subskillId)) {
        context.addIssue({
          code: 'custom',
          message: `Benchmark references unknown subskill "${benchmark.subskillId}"`,
          path: ['benchmarks', index, 'subskillId'],
        })
      }
    })
  })

export const domainDefinitionSchema = z.object({
  schemaVersion: z.literal(1),
  id: stableIdSchema,
  name: z.string().min(1),
  description: z.string().min(1),
  northStar: z.string().min(1).optional(),
  branches: z.array(branchDefinitionSchema).min(1),
})

const capabilityLevelSchema = z.union([
  z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5),
  z.literal(6), z.literal(7), z.literal(8), z.literal(9), z.literal(10),
])

export const domainProgressSchema = z.object({
  schemaVersion: z.literal(1),
  domainId: stableIdSchema,
  status: z.enum(domainLifecycleStatuses),
  branches: z.array(
    z.object({
      branchId: stableIdSchema,
      focus: z.enum(branchFocusStatuses),
      targetLevel: capabilityLevelSchema.optional(),
    }),
  ),
  installedAt: z.iso.datetime(),
})
