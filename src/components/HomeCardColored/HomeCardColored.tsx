import styled from 'styled-components';
import HomeButton from '../Buttons/HomeButton'

type HomeCardColoredProps =  {
  title: string;
  mainText: string;
  thirdText: string;
  onClickButton?: () => void;
};

const HomeCardColored = ({
    title,
    mainText,
    thirdText,
    onClickButton,
}: HomeCardColoredProps): JSX.Element => {

  return (
    <Wrapper className="flex flex-column justify-content-md-evenly items-center">
      <h3
      style={{fontSize: 30 ,
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 600,
        color: "#253E89",
        }} className="text-green">{title}</h3>
      <h2
       style={{fontSize: 60 ,
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 900
        }} className="text-green" >{mainText}</h2>
        {!onClickButton ?
          <p style={{fontFamily: "Poppins", fontStyle: "normal", fontSize: 18, color: "#253E89", textAlign: "center", padding: "0 60px"}}>{thirdText}</p>
        :
          <HomeButton text={thirdText} onClick={onClickButton} />
        }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-radius: 12px;
  height: 250px;
  background: rgba(97, 200, 217, .15);
  margin: 10px;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;


export default HomeCardColored;