const USER_STORAGE_KEY = 'current_user';

export interface StoredUser {
    id: string;
    email: string;
    name: string;
}

export function setStoredUser(user: StoredUser) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export function getStoredUser(): StoredUser | null {
    if (typeof window === 'undefined') return null;

    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw) as StoredUser;
    } catch {
        return null;
    }
}

export function removeStoredUser() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(USER_STORAGE_KEY);
}