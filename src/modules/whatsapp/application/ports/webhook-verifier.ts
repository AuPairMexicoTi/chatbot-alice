export interface VerifyWebhookSignatureInput {
  rawBody: Buffer;
  signatureHeader: string | undefined;
}

export interface WebhookVerifier {
  verifyChallenge(
    mode: string,
    verifyToken: string,
    challenge: string,
  ): string | null;
  verifySignature(input: VerifyWebhookSignatureInput): boolean;
}

export const WEBHOOK_VERIFIER = Symbol('WEBHOOK_VERIFIER');
