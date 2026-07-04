// Sliding window: only the last N messages are sent to the LLM.
const MAX_MESSAGES = 20;

export function trimHistory(messages = []) {
  return messages.slice(-MAX_MESSAGES);
}