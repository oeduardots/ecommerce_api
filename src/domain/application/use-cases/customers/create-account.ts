import type { HashGenerator } from '@/domain/application/gateways/cryptography/hash-generator'
import type { CustomersRepository } from '@/domain/application/repositories/customers-repository'
import { Customer } from '@/domain/enterprise/entities/customer'

interface CreateAccountUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateAccountUseCaseResponse {
  customer: Customer
}

export class CreateAccountUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateAccountUseCaseRequest): Promise<CreateAccountUseCaseResponse> {
    const customerWithSameEmail =
      await this.customersRepository.findByEmail(email)

    if (!customerWithSameEmail) {
      throw new Error('Customer already exists.')
    }

    const hashedPassoword = await this.hashGenerator.hash(password)

    const customer = Customer.create({
      name,
      email,
      password: hashedPassoword,
    })

    await this.customersRepository.create(customer)

    return {
      customer,
    }
  }
}
