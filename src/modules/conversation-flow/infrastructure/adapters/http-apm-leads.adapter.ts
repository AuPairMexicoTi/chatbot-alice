import { ConfigService } from '@nestjs/config';
import {
  ApmLeadsPort,
  CreateApmLeadInput,
  CreateApmLeadResult,
} from '../../application/ports/apm-leads.port';

export class HttpApmLeadsAdapter implements ApmLeadsPort {
  constructor(private readonly config: ConfigService) {}
  async createOrFind(input: CreateApmLeadInput): Promise<CreateApmLeadResult> {
    const url = this.config.getOrThrow<string>('crm.aliceLeadsUrl');
    const secret = this.config.getOrThrow<string>('crm.aliceIntegrationSecret');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Alice-Integration-Secret': secret,
      },
      body: JSON.stringify(input),
    });
    if (!response.ok)
      throw new Error(`APM lead request failed with ${response.status}`);
    const body: unknown = await response.json();
    if (
      !body ||
      typeof body !== 'object' ||
      !('data' in body) ||
      !body.data ||
      typeof body.data !== 'object' ||
      !('profilingLink' in body.data) ||
      typeof body.data.profilingLink !== 'string'
    )
      throw new Error('APM lead response is invalid');
    return { profilingLink: body.data.profilingLink };
  }
}
