import { useCallback, useEffect, useState } from 'react'
import type { DomainDefinition, InstalledDomain } from '../models/domain'
import { domainRepository } from '../storage/domainRepository'

interface DomainsState {
  domains: InstalledDomain[]
  loading: boolean
  error?: string
}

export function useDomains() {
  const [state, setState] = useState<DomainsState>({ domains: [], loading: true })

  const load = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: undefined }))
    try {
      const domains = await domainRepository.listInstalled()
      setState({ domains, loading: false })
    } catch (error) {
      setState({ domains: [], loading: false, error: getErrorMessage(error) })
    }
  }, [])

  useEffect(() => {
    let active = true

    domainRepository.listInstalled().then(
      (domains) => {
        if (active) setState({ domains, loading: false })
      },
      (cause: unknown) => {
        if (active) setState({ domains: [], loading: false, error: getErrorMessage(cause) })
      },
    )

    return () => {
      active = false
    }
  }, [])

  const install = useCallback(
    async (definition: DomainDefinition) => {
      await domainRepository.install(definition)
      await load()
    },
    [load],
  )

  return { ...state, install }
}

export function useDomain(domainId: string | undefined) {
  const [domain, setDomain] = useState<InstalledDomain>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)
      setError(undefined)
      try {
        const result = domainId ? await domainRepository.getInstalled(domainId) : undefined
        if (active) setDomain(result)
      } catch (cause) {
        if (active) setError(getErrorMessage(cause))
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()
    return () => {
      active = false
    }
  }, [domainId])

  return { domain, loading, error }
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'An unexpected storage error occurred.'
}
