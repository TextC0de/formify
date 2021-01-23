import styled from 'styled-components';

import Card from '@src/components/styled/Card';
import { textPalette } from '@src/utils/styled';

export const Wrapper = styled.div``;

export const FormLink = styled(Card)`
    transition: 0.3s ease-in-out;
    font-size: 0.8rem;
    cursor: pointer;
    overflow: hidden;

    &:hover {
        background: #f7f7f7;
    }
`;

export const FormSubmissionsHeader = styled.header`
    padding: 3rem 0;
`;

export const Stats = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
`;

export const Stat = styled.div`
    display: inline-block;
    background: #f7f7f7;
    padding: 0.875rem;
    text-align: center;
`;

export const StatContent = styled.span`
    display: block;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.375rem;
    color: ${textPalette('primary')};
`;

export const StatTitle = styled.span`
    display: block;
    font-size: 0.775rem;
    text-transform: uppercase;
    color: ${textPalette('primary')};
`;

export const SubmissionsList = styled.span`
    .FormSubmissions_Submission-Card:not(:last-child) {
        margin-bottom: 1rem;
    }
`;
