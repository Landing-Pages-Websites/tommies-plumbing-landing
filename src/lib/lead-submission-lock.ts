// Page-wide latch shared by the hero and final lead forms: only one lead request
// may be in flight at a time, no matter which form (or how many clicks) started it.
let leadInFlight = false;

/** Synchronously claim the lock; false when another submission is already in flight. */
export function acquireLeadLock(): boolean {
  if (leadInFlight) return false;
  leadInFlight = true;
  return true;
}

export function releaseLeadLock(): void {
  leadInFlight = false;
}
