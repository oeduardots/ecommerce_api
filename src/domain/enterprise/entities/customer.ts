import { Entity } from '@/shared/entities/entity'
import type { UniqueEntityID } from '@/shared/entities/unique-entity-id'
import type { Optional } from '@/shared/types/optional'

interface CustomerProps {
  name: string
  email: string
  password: string
  phone?: string | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Customer extends Entity<CustomerProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get phone() {
    return this.props.phone
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  set password(password: string) {
    this.props.password = password
    this.touch()
  }

  set phone(phone: string | null | undefined) {
    this.props.phone = phone
    this.touch()
  }

  static create(
    props: Optional<CustomerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const customer = new Customer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return customer
  }
}
