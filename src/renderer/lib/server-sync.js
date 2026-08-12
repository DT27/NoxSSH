/**
 * Which folders on the Hosts page belong to an external sync import.
 *
 * These ids were minted by the old CloudBlast server sync (cloudblast / cloudblast-folder-*).
 * We keep them so existing user data continues to render with the correct badges,
 * but the labels in the UI are now neutral (no provider names).
 */

export const SYNC_FOLDER_ID = 'cloudblast';

const PROJECT_PREFIX = 'cloudblast-folder-';

/**
 * What a folder is to a sync import: 'account' for the root sync folder,
 * 'project' for a project subfolder, or null for a user-created folder.
 */
export function syncedFolder(folderId) {
    if (!folderId) return null;
    if (folderId === SYNC_FOLDER_ID) return 'account';
    return String(folderId).startsWith(PROJECT_PREFIX) ? 'project' : null;
}
