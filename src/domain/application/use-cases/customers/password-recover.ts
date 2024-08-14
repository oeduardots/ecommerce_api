import type { CustomersRepository } from '@/domain/application/repositories/customers-repository'
import type { TokensRepository } from '@/domain/application/repositories/tokens-repository'
import { Token } from '@/domain/enterprise/entities/token'

interface PasswordRecoverUseCaseRequest {
  email: string
}

interface PasswordRecoverUseCaseResponse {
  recoveryToken: string
}

export class PasswordRecoverUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private tokensRepository: TokensRepository,
  ) {}

  async execute({
    email,
  }: PasswordRecoverUseCaseRequest): Promise<PasswordRecoverUseCaseResponse> {
    const userFromEmail = await this.customersRepository.findByEmail(email)

    if (!userFromEmail) {
      throw Error('Not found.')
    }

    const token = Token.create({
      type: 'PASSWORD_RECOVER',
      customerId: userFromEmail.id,
    })

    const { id: recoveryToken } = await this.tokensRepository.create(token)

    return {
      recoveryToken,
    }
  }
}
