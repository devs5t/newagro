import styled from 'styled-components';

type VideoProps =  {
  className?: String;
};

const Video = ({
  className = "",
}: VideoProps): JSX.Element => {
  return (
    <video 
      poster="/images/photos/poster.jpg" 
      preload="none" 
      loop={true} 
      controls={true} 
      className={`rounded-xl h-42 w-full ${className}`}
    >
      <source src="https://newagrocoin.com/media/nac_media.mp4" type="video/mp4" />
    </video>
  );
}


export default Video;