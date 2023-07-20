import type { Context } from 'aws-lambda'

export type MiddlewareContext<TResult = any> = Context & { end: () => void; prev: TResult }
