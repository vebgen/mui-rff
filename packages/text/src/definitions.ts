export const TYPE_PASSWORD = 'password';
export const TYPE_TEXT = 'text';
export const TYPE_EMAIL = 'email';
export const TYPE_NUMBER = 'number';
export const TYPE_URL = 'url';
export const TYPE_TELEPHONE = 'tel';
export const TYPE_DATE = 'date';
export const TYPE_DATETIME_LOCAL = 'datetime-local';
export const TYPE_MONTH = 'month';
export const TYPE_TIME = 'time';
export const TYPE_WEEK = 'week';
export const TYPE_COLOR = 'color';

// Restricts the type values to 'password', 'text', 'email',
// 'number', and 'url'.
export type TEXT_FIELD_TYPE =
    | typeof TYPE_PASSWORD
    | typeof TYPE_TEXT
    | typeof TYPE_EMAIL
    | typeof TYPE_NUMBER
    | typeof TYPE_URL
    | typeof TYPE_TELEPHONE
    | typeof TYPE_DATE
    | typeof TYPE_DATETIME_LOCAL
    | typeof TYPE_MONTH
    | typeof TYPE_TIME
    | typeof TYPE_WEEK
    | typeof TYPE_COLOR;
