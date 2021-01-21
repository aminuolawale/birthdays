import styled from "styled-components";
import { styling } from "../../constants";

export const Home = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 80px 0;
`;

export const Hero = styled.div`
  height: 70vh;
  display: flex;
  align-items: center;
  z-index: 2;
`;

export const HeroContent = styled.div`
  width: 650px;
`;

export const MainText = styled.div`
  font-size: ${styling.XLG_FONT};
  font-weight: 800;
`;

export const ButtonContainer = styled.div`
  margin-top: 40px;
`;
