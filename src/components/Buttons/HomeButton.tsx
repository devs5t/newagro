import styled from 'styled-components';

type HomeButtonProps =  {
  text: string;
  onClick: () => void | undefined;
};

const HomeButton = ({ text, onClick }: HomeButtonProps): JSX.Element => {
  return (
    <Wrapper onClick={onClick} className="flex flex-column justify-content-md-evenly items-center">
      <p className="text-white"
       style={{
         textAlign: "center",
         fontFamily: "poppins",
         fontWeight: 600,
         fontSize: 18,
         padding: "5px 10px"
       }}>{text}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-radius: 30px;
  background: #253E89;
  padding: 0px 5px;
`;


export default HomeButton;