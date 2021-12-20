import styled from 'styled-components';

type BannerProps =  {
  title: string;
  subtitle: string;
  image: string;
};

const Banner = ({
    title,
    subtitle,
    image
}: BannerProps): JSX.Element => {

  return (
    <Wrapper
      className="flex flex-column justify-content-md-evenly items-center"
      style={{backgroundImage: `url(${image})`}}
    >
      <Fade />
      <h3 style={{fontSize: 48, zIndex: 2, marginBottom: 20}} className="text-white font-semibold">{title}</h3>
      <h5 style={{fontSize: 24, zIndex: 2}} className="text-white">{subtitle}</h5>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-radius: 12px;
  height: 250px;
  position: relative;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Fade = styled.div`
  background: linear-gradient(179.48deg, #253E89 0.45%, rgba(37, 62, 137, 0) 99.55%);
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 12px;
`;


export default Banner;