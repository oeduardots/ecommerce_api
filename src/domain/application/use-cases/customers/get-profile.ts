import type { CustomersRepository } from '@/domain/application/repositories/customers-repository'
import type { Customer } from '@/domain/enterprise/entities/customer'

interface GetProfileUseCaseRequest {
  customerId: string
}

interface GetProfileUseCaseResponse {
  customer: Customer
}

export class GetProfileUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    customerId,
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    const customer = await this.customersRepository.findById(customerId)

    if (!customer) {
      throw new Error('Not found.')
    }

    return {
      customer,
    }
  }
}
