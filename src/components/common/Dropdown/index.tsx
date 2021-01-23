import { useEffect, useRef, useState } from 'react';

import IconArrow from '@src/components/icons/IconArrowBold';
import Label from '@src/components/styled/Label';

import {
    DropdownButton,
    DropdownButtonIcon,
    Menu,
    Option,
    Wrapper
} from './styles';

export type DropdownOption = {
    value: string | number;
    label: string;
};

export interface Props {
    label: string;
    options: DropdownOption[] | string[];
    placeholder: string;
    value: string | null | undefined;
    defaultValue?: string;
    onChange: (option: DropdownOption) => void;
}

const Dropdown: React.FC<
    Props & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>
> = ({
    label,
    options,
    placeholder,
    value,
    defaultValue,
    onChange,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [focusedOptionIndex, setFocusedOptionIndex] = useState<number | null>(
        null
    );
    const dropdownButtonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const clickHandler = (e: MouseEvent): void => {
            if (!e.target || e.target === null) return;

            // if some myRef contains the clicked element don't do nothing
            const currentRefs = [dropdownButtonRef.current, menuRef.current];

            if (
                currentRefs.some(
                    (current) =>
                        current &&
                        (current === e.target ||
                            current.contains(e.target as HTMLElement))
                )
            ) {
                return;
            }

            setIsOpen(false);
        };

        window.addEventListener('click', clickHandler, false);

        return (): void => {
            window.removeEventListener('click', clickHandler, false);
        };
    }, []);

    const getOptionElements = (): NodeListOf<HTMLLIElement> | null =>
        menuRef.current && menuRef.current.querySelectorAll('li');

    const optionsAreStrings = (): boolean =>
        options.some((option: unknown) => typeof option === 'string');

    const getOptionAsObject = (index: number): DropdownOption => {
        if (optionsAreStrings()) {
            return {
                label: (options[index] as unknown) as string,
                value: (options[index] as unknown) as string
            };
        }

        return options[index] as DropdownOption;
    };

    const focusMenuOption = (index: number): void => {
        const elements = getOptionElements();

        if (!elements) return;
        if (elements.length >= index) elements[index].focus();

        setFocusedOptionIndex(index);
    };

    const handleKeyboardArrowNavigation = (direction: 'up' | 'down'): void => {
        const elements = getOptionElements();
        if (!elements) return;
        if (!focusedOptionIndex) {
            focusMenuOption(0);
            return;
        }

        let focusedIndex = focusedOptionIndex || 0;

        if (direction === 'up' && focusedIndex > 0) {
            focusedIndex -= 1;
        } else if (direction === 'down' && focusedIndex < elements.length - 1) {
            focusedIndex += 1;
        }

        focusMenuOption(focusedIndex);
    };

    const onButtonClick = (
        e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
    ) => {
        e.preventDefault();
        setIsOpen((status) => !status);
    };

    const onButtonKeyDown = (
        e: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>
    ) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();

            if (!isOpen) {
                setIsOpen(true);
            } else {
                focusMenuOption(0);
            }
        }
    };

    const onOptionItemClick = (index: number) => (
        e: React.MouseEvent<HTMLLIElement>
    ): void => {
        e.preventDefault();
        setIsOpen(false);
        onChange(getOptionAsObject(index));
    };

    const onOptionItemKeyDown = (index: number) => (
        e: React.KeyboardEvent<HTMLLIElement>
    ): void => {
        if (menuRef.current) {
            const liElements = menuRef.current.querySelectorAll('li');

            switch (e.key) {
                case 'Enter':
                    e.preventDefault();
                    setIsOpen(false);
                    onChange(getOptionAsObject(index));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    handleKeyboardArrowNavigation('up');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    handleKeyboardArrowNavigation('down');
                    break;
                case 'Tab':
                    if (focusedOptionIndex === liElements.length - 1) {
                        setIsOpen(false);
                    }
                    break;
                default:
                    break;
            }
        }
    };

    const getOptionsAsLabels = () =>
        optionsAreStrings()
            ? (options as string[])
            : (options as DropdownOption[]).map(({ label }) => label);

    const getSelectedValue = () =>
        optionsAreStrings()
            ? value || defaultValue
            : (options as DropdownOption[]).find(
                  (option) => option.value === (value || defaultValue)
              )?.label || placeholder;

    return (
        <Wrapper {...props} data-cy="dropdown">
            <Label>{label}</Label>
            <DropdownButton
                ref={dropdownButtonRef}
                tabIndex={0}
                aria-haspopup="listbox"
                onClick={onButtonClick}
                onKeyDown={onButtonKeyDown}
                data-cy="dropdown-selected-option"
            >
                <span>{getSelectedValue()}</span>
                <DropdownButtonIcon onClick={onButtonClick}>
                    <IconArrow direction={isOpen ? 'up' : 'down'} />
                </DropdownButtonIcon>
            </DropdownButton>

            {isOpen && (
                <Menu ref={menuRef} tabIndex={-1} role="listbox">
                    {getOptionsAsLabels().map((option, index) => (
                        <Option
                            selected={option === value}
                            key={option}
                            onClick={onOptionItemClick(index)}
                            onKeyDown={onOptionItemKeyDown(index)}
                        >
                            {option}
                        </Option>
                    ))}
                </Menu>
            )}
        </Wrapper>
    );
};

Dropdown.defaultProps = {
    label: 'Selecciona un opción',
    options: []
};

export default Dropdown;
