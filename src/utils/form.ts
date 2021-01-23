const getSubmitedFormKey = (id: string) => 'submited-form' + id;

export const getFormWasSubmited = (id: string): string | null =>
    typeof window === 'undefined'
        ? null
        : localStorage.getItem(getSubmitedFormKey(id));

export const setFormAsSubmited = (id: string): void => {
    localStorage.setItem(getSubmitedFormKey(id), 'true');
};
