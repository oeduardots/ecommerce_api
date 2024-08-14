import type { Token } from '@/domain/enterprise/entities/token'

export abstract class TokensRepository {
  abstract findById(id: string): Promise<Token | null>
  abstract create(token: Token): Promise<{ id: string }>
  abstract delete(id: string): Promise<void>
}
