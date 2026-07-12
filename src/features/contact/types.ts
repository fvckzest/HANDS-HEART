export interface ContactSubmission {
  name: string
  email: string
  message: string
  /** A hidden bot-trap field. Human visitors leave this empty. */
  website: string
}

/**
 * The client-side boundary that T012 will connect to the configured Pages
 * Function. It deliberately contains no transport or delivery assumptions.
 */
export type ContactSubmitHandler = (submission: ContactSubmission) => Promise<void>
