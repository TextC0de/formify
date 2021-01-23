import styled from 'styled-components';

type Colors = {
    zero?: string;
    started?: string;
    full?: string;
};

interface BarProps {
    progress: number;
    colors?: Colors;
}

const Progress = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const ProgressText = styled.span`
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
`;

const getBackground = (
    { progress, colors }: BarProps,
    defaults: Colors
): string => {
    if (progress === 0) {
        return `linear-gradient(
            90deg,
             ${colors?.zero || defaults.zero} 7%, 
             #EBEFF2 7%
             )`;
    }

    if (progress === 100) {
        return `linear-gradient(
            90deg,
            ${colors?.full || defaults.full} 100%, 
             #EBEFF2 100%
             )`;
    }

    if (progress >= 7) {
        return `linear-gradient(
            90deg,
            ${colors?.started || defaults.started} ${progress}%, 
             #EBEFF2 7%
             )`;
    }

    return `linear-gradient(
        90deg,
        ${colors?.started || defaults.started} 7%, 
         #EBEFF2 7%
         )`;
};

const Bar = styled.span.attrs<BarProps>(({ theme, ...props }) => ({
    style: {
        background: getBackground(props, {
            zero: '#AEAEAE',
            started: '#ffa8a8',
            full: '#2ED47A'
        })
    }
}))<BarProps>`
    width: 5.688rem;
    height: 4px;
    border-radius: 3px;
`;

interface Props extends BarProps {
    hideText?: boolean;
}

const ProgressBar: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
    hideText,
    progress,
    colors,
    ...props
}) => (
    <Progress {...props}>
        {!hideText && (
            <ProgressText>
                Completado: {Math.round(progress || 0)}%
            </ProgressText>
        )}
        <Bar progress={Math.round(progress || 0)} colors={colors || {}} />
    </Progress>
);

export default ProgressBar;
