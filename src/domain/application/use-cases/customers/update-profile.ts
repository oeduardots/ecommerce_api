import type { CustomersRepository } from '@/domain/application/repositories/customers-repository'
import type { Customer } from '@/domain/enterprise/entities/customer'

interface UpdateProfileUseCaseRequest {
  customerId: string
  name: string
  email: string
  phone: string
}

interface UpdateProfileUseCaseResponse {
  customer: Customer
}

export class UpdateProfileUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    customerId,
    name,
    email,
    phone,
  }: UpdateProfileUseCaseRequest): Promise<UpdateProfileUseCaseResponse> {
    const customer = await this.customersRepository.findById(customerId)

    if (!customer) {
      throw new Error('Not found.')
    }

    customer.name = name
    customer.email = email
    customer.phone = phone

    await this.customersRepository.save(customer)

    return {
      customer,
    }
  }
}
