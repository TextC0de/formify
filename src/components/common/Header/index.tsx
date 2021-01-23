import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation } from 'urql';

import { USER_LOGOUT_MUTATION } from '@src/graphql/mutation/user.logout';
import { deleteToken, getToken } from '@src/utils/auth';

import { Hamburger, HamburgerBar, Menu, Option } from './styles';

const Header: React.FC = () => {
    const router = useRouter();
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const [, logout] = useMutation(USER_LOGOUT_MUTATION);

    const onHamburgerClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        setShowMenu((showing) => !showing);
    };

    const onLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        deleteToken();
        logout();
        setShowMenu(false);
        router.push('/');
    };

    return (
        <>
            <Menu className={showMenu ? 'open' : undefined}>
                {!getToken() && (
                    <>
                        <Link href="/login" passHref>
                            <Option>Iniciar sesión</Option>
                        </Link>
                        <Link href="/signup" passHref>
                            <Option>Empezar ahora</Option>
                        </Link>
                    </>
                )}

                {!!getToken() && (
                    <>
                        <Link href="/admin" passHref>
                            <Option>Mis formularios</Option>
                        </Link>
                        <Option onClick={onLogoutClick}>Cerrar sesión</Option>
                    </>
                )}
            </Menu>
            <Hamburger onClick={onHamburgerClick} closed={!showMenu}>
                <HamburgerBar />
                <HamburgerBar />
                <HamburgerBar />
            </Hamburger>
        </>
    );
};

export default Header;
