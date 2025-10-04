// Based on 08/30/2025 documentation at: https://classicuo.org/scripting/namespaces/Journal/
// Status: Initial AI conversion from documentation, audited, refined, tested, and added status messages

/**
 * The Journal class can be used to inspect the game journal contents to trigger parts of your script.
 * Use it for:
 * - Checking if the Journal contains text
 * - Waiting for text to appear in the Journal
 * - Waiting for a possible strings to exist
 */
interface Journal {
    /**
     * Clears/forgets the journal history. This is useful if you don't want to process older journal entries.
     * NOTE: This only clears the journal history from the perspective of your script, but not literally.
     * @status Definition audited, refined, UOC editor tested
     * @example
     * player.say('Hello there');
     * journal.waitForText('Hello there'); // This will succeed quickly as the text was just added
     * journal.clear();
     * journal.waitForText('Hello there'); // this will time out, as the string is now empty.
     */
    clear(): void;
    
    /**
     * Checks for the existence of text in the journal. Use journal.clear() before this if your testing for an event.
     * @param text The text to search for
     * @param author Optional author filter
     * @returns true/false if the text exists in the journal
     * @status Definition audited, refined, UOC editor tested
     */
    containsText(text: string, author?: string): boolean;
    
    /**
     * Waits for the text to appear in the journal, but note that this does ignore character casing.
     * @param text The text to wait for
     * @param author Optional author filter
     * @param timeout Optional timeout in milliseconds
     * @returns true/false if the text was found
     * @status Definition audited, refined, UOC editor tested
     * @example
     * const healthBefore = player.hits;
     * 
     * journal.clear();
     * player.useType(0xe21);
     * target.waitTargetSelf();
     * 
     * if (journal.waitForText('You healed', 'System', 8000)) {
     *   client.headMsg(`Bandaged +${player.hits - healthBefore}`, player, 66);
     * }
     */
    waitForText(text: string, author?: string, timeout?: number): boolean;
    
    /**
     * Waits for ANY string in an array of strings to be found in the Journal, or for the timeout to be hit.
     * Returns the first string (you provided) to be found or null if the timeout was reached. This does 
     * NOT return the entire string in which is was found and is NOT constrained by character casing.
     * This method is useful if you're waiting for any one of a list of strings to appear.
     * If you want all the strings to appear you should use waitForTextEvery()
     * NOTE: You can combine this with SysMsg/HeadMsg/Say to essentially create a dynamic input driven script.
     * @param text Array of text strings to wait for
     * @param author Optional author filter
     * @param timeout Optional timeout in milliseconds (defaults to 5000)
     * @returns The string if it was found, or null if not
     * @status Definition audited, refined, UOC editor tested
     * @example
     * const waitMessage = 'You must wait';
     * const failMessage = 'You cannot focus';
     * const successMessage = 'You enter a meditative trance.';
     * 
     * journal.clear();
     * const response = journal.waitForTextAny([waitMessage, failMessage, successMessage]);
     * 
     * switch (response) {
     *   case waitMessage: {
     *     // sleep
     *     break;
     *   }
     *   case failMessage: {
     *     // retry
     *     break;
     *   }
     *   case successMessage: {
     *     // loop
     *     break;
     *   }
     * }
     */
    waitForTextAny(text: string[], author?: string, timeout?: number): string | null;
    
    /**
     * Waits for EVERY string in an array of strings to be found in the Journal, or for the timeout to be hit.
     * Returns all the strings that were found, may be less than the input if the timeout was hit. This does
     * NOT return the entire string in which is was found, 1 journal entry can match multiple of your input
     * strings, and this method is NOT constrained by character casing.
     * This method is useful if you're waiting for several strings to all appear.
     * If you want to wait for any string in the input array use waitForTextAny
     * @param text Array of text strings to wait for
     * @param author Optional author filter
     * @param timeout Optional timeout in milliseconds
     * @returns All the strings that were found within the timeout, or an empty array if none were found
     * @status Definition audited, refined, UOC editor tested
     * @example
     * const waitMessage = 'You must wait';
     * const failMessage = 'You cannot focus';
     * const successMessage = 'You enter a meditative trance.';
     * 
     * journal.clear();
     * const response = journal.waitForTextEvery([waitMessage, failMessage, successMessage], null, Number.MAX_VALUE);
     * 
     * if (response.includes(successMessage)) {
     *   client.headMsg(`Meditating...`, player, 66);
     * }
     */
    waitForTextEvery(text: string[], author?: string, timeout?: number): string[];
    
}


