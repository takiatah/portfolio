export type CertificateStatus = 'completed' | 'in-progress'

export interface Certificate {
  title: string
  issuer: string
  status: CertificateStatus
  /** Completion date for completed certificates, e.g. "2026-05". */
  completed?: string
  credentialUrl?: string
}

/** Add certificates here; the About page renders each with its completion status. */
export const certificates: Certificate[] = []
