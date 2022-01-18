import styled from 'styled-components';

type BannerProps =  {
  title: string;
  subtitle: string;
  image: string;
  containerClasses?: string;
};

const Banner = ({
    title,
    subtitle,
    image,
    containerClasses,
}: BannerProps): JSX.Element => {

  return (
    <div
      className={`flex flex-column justify-content-md-evenly items-center ${containerClasses}`}
      style={{backgroundImage: `url(${image})`,
        borderRadius: 12,
        position: "relative",
        backgroundPosition: "50%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Fade />
      <h3 className="z-10 text-white text-center mb-5 font-medium text-xl md:mb-2 md:mb-10 md:text-5xl">{title}</h3>
      <h5 className="z-10 text-white text-center mx-3 text-sm md:font-light md:px-20 md:text-2xl">{subtitle}</h5>
    </div>
  );
}


const Fade = styled.div`
  background: linear-gradient(179.48deg, #253E89 0.45%, rgba(37, 62, 137, 0) 99.55%);
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 12px;
`;


export default Banner;