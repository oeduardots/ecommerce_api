import { Entity } from '@/shared/entities/entity'
import type { UniqueEntityID } from '@/shared/entities/unique-entity-id'
import type { Optional } from '@/shared/types/optional'

interface TokenProps {
  customerId: UniqueEntityID
  type: 'PASSWORD_RECOVER'
  createdAt: Date
}

export class Token extends Entity<TokenProps> {
  get customerId() {
    return this.props.customerId
  }

  get type() {
    return this.props.type
  }

  static create(props: Optional<TokenProps, 'createdAt'>, id?: UniqueEntityID) {
    const token = new Token(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return token
  }
}
