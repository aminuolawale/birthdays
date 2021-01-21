import styled from "styled-components";

export const Banner = styled.div`
  width: 1600px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > input {
    display: none;
  }
`;

export const BannerLoader = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

export const BannerImage = styled.img`
  border-radius: 20px;
  width: 1600px;
  height: 300px;
  &:hover {
    cursor: pointer;
    -webkit-filter: brightness(80%);
  }
`;
