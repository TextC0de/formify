import { ComponentType } from 'react';

import { Normal, WithBg, Wrapper } from './styles';

type Props = {
    Icon: ComponentType;
};

const ThemedLayout: React.FC<Props> = ({ Icon, children }) => (
    <Wrapper>
        <WithBg>
            <Icon />
        </WithBg>
        <Normal>{children}</Normal>
    </Wrapper>
);

export default ThemedLayout;
