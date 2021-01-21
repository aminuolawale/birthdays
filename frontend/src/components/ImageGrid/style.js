import styled from "styled-components";

export const ImageGrid = styled.div`
  width: 640px;
  height: 640px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  & > img {
    height: 300px;
    width: 300px;
    border-radius: 20px;
  }
`;
