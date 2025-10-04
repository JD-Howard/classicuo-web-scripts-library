// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/Prompt/

/**
 * The Prompt class is for interacting with text prompts via the chat box.
 * Prompt is accessible in the global scope via the variable `prompt`.
 */
declare const prompt: Prompt;

interface Prompt {
    /**
     * Checks if a prompt exists and is waiting for input
     * @example
     * if (prompt.exists) {
     *   prompt.reply('House Rune');
     * }
     */
    readonly exists: boolean;
    
    /**
     * Reply to a currently waiting prompt, if one is open
     * @param value The text value to reply with
     * @example
     * prompt.reply('House Rune');
     */
    reply(value: string): void;
    
    /**
     * Waits for a prompt to be open
     * @param timeoutMs Optional time in milliseconds to wait
     * @returns True if the prompt opened within the timeout, false otherwise
     * @example
     * prompt.waitUntilOpen(1000); // wait 1 second
     * prompt.reply('Yes');
     */
    waitUntilOpen(timeoutMs?: number): boolean;
}

