import type { Customer } from '@/domain/enterprise/entities/customer'

export abstract class CustomersRepository {
  abstract findById(id: string): Promise<Customer | null>
  abstract findByEmail(email: string): Promise<Customer | null>
  abstract save(customer: Customer): Promise<void>
  abstract create(customer: Customer): Promise<void>
}
