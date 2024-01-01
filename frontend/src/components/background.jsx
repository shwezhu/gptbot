import backgroundImage from "../images/bg.jpg";

export default function Background() {
  return (
      <div
          style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: -1,
          }}
      >
      </div>
  );
}