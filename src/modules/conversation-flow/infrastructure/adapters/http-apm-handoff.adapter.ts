import { ConfigService } from '@nestjs/config';
import {
  ApmAdvisor,
  ApmHandoffPort,
  RequestApmHandoffInput,
} from '../../application/ports/apm-handoff.port';

export class HttpApmHandoffAdapter implements ApmHandoffPort {
  constructor(private readonly config: ConfigService) {}

  async request(input: RequestApmHandoffInput): Promise<ApmAdvisor> {
    const url = this.config.getOrThrow<string>('crm.aliceHandoffsUrl');
    const secret = this.config.getOrThrow<string>('crm.aliceIntegrationSecret');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Alice-Integration-Secret': secret,
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(
        `APM handoff request failed with ${response.status}: ${detail.slice(0, 500)}`,
      );
    }
    const body: unknown = await response.json();
    if (!this.hasAdvisor(body))
      throw new Error('APM handoff response is invalid');
    return body.data.advisor;
  }

  private hasAdvisor(
    value: unknown,
  ): value is { data: { advisor: ApmAdvisor } } {
    if (
      !value ||
      typeof value !== 'object' ||
      !('data' in value) ||
      !value.data ||
      typeof value.data !== 'object' ||
      !('advisor' in value.data) ||
      !value.data.advisor ||
      typeof value.data.advisor !== 'object'
    )
      return false;
    const advisor = value.data.advisor;
    return (
      'name' in advisor &&
      (typeof advisor.name === 'string' || advisor.name === null) &&
      'whatsappLink' in advisor &&
      (typeof advisor.whatsappLink === 'string' ||
        advisor.whatsappLink === null) &&
      'imageUrl' in advisor &&
      (typeof advisor.imageUrl === 'string' || advisor.imageUrl === null) &&
      'isMailbox' in advisor &&
      typeof advisor.isMailbox === 'boolean'
    );
  }
}
