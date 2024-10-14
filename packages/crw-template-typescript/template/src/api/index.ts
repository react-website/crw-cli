export * as users from './users'

export const typePrefix = (url: string) => `${url}`.slice(1).replaceAll('/', '_').toLowerCase()
