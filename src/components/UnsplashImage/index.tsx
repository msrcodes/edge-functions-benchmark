import Image from 'next/image';

interface UnsplashImageProps {
  src: string;
  width: number;
  height: number;
}

const UnsplashImage = ({src, width, height}: UnsplashImageProps) => (
  <Image
    src={src}
    loader={({width, src, quality}) =>
      `https://images.unsplash.com/photo-${src}?auto-format&fit=crop&w=${width}&q=${quality}`
    }
    placeholder="blur"
    blurDataURL="data:image/svg+xml;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
    width={width}
    height={height}
  />
);

export default UnsplashImage;
