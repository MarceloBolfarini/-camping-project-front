import styled from 'styled-components';

export const Input = styled.input`
    border-color: ${(props)=> props.color === true ? "blue" : "red"};
    border-radius: 6px;
`;

export const Moldura = styled.div`
    border: ${(props) => props.red === true && props.height === 1000 ? '1px solid red' : '1px solid black'};
    width: 100px;
    height: 100px;
    border-radius: 5px;
`;





