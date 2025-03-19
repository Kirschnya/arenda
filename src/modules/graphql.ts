import { gql } from '@apollo/client';

export const FETCH_DEVELOPMENT = gql`
    query Query($id: Int!) {
        device (id: $id) {
            id
            name
            description
            status
            image
            cables
            video
        }
    }
`;

export const CREATE_DEVELOPMENT = gql`
    mutation CreateDevice($name: String!, $description: String!, $cables: Int!) {
        createDevice(name: $name, description: $description, cables: $cables) {
            device {
                id
                name
                description
                status
                image
                cables
            }
        }
    }
`;