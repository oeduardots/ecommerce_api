import type { Encrypter } from '@/domain/application/gateways/cryptography/encrypter'
import type { HashComparer } from '@/domain/application/gateways/cryptography/hash-comparer'
import type { CustomersRepository } from '@/domain/application/repositories/customers-repository'

interface AuthenticateWithPasswordUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateWithPasswordUseCaseResponse {
  accessToken: string
}

export class AuthenticateWithPasswordUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateWithPasswordUseCaseRequest): Promise<AuthenticateWithPasswordUseCaseResponse> {
    const customer = await this.customersRepository.findByEmail(email)

    if (!customer) {
      throw new Error('Wrong credentials.')
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      customer.password,
    )

    if (!isPasswordValid) {
      throw new Error('Wrong credentials.')
    }

    const accessToken = await this.encrypter.encrypt({
      sub: customer.id.toString(),
    })

    return {
      accessToken,
    }
  }
}
