import type { HashGenerator } from '@/domain/application/gateways/cryptography/hash-generator'
import type { CustomersRepository } from '@/domain/application/repositories/customers-repository'
import type { TokensRepository } from '@/domain/application/repositories/tokens-repository'

interface ResetPasswordUseCaseRequest {
  recoveryToken: string
  password: string
}

interface ResetPasswordUseCaseResponse {}

export class ResetPasswordUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private tokensRepository: TokensRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    recoveryToken,
    password,
  }: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
    const token = await this.tokensRepository.findById(recoveryToken)

    if (!token) {
      throw new Error('Unauthorized.')
    }

    const customer = await this.customersRepository.findById(
      token.customerId.toString(),
    )

    if (!customer) {
      throw new Error('Unauthorized.')
    }

    const hashedPassoword = await this.hashGenerator.hash(password)

    customer.password = hashedPassoword

    await this.customersRepository.save(customer)

    await this.tokensRepository.delete(recoveryToken)

    return {}
  }
}
