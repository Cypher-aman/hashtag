import Image from 'next/image';
import DogImage from '@/assets/images/dog.png';

const Error = () => {
  return (
    <div className="flex w-full flex-col p-3 items-center justify-center h-screen gap-4">
      <Image src={DogImage} alt="Dog" width={300} height={300} />
      <h1 className="text-xl text-center">
        Error 101: Dog ate my webpage. Apologies for the fetch error, our coding
        canine is on a snack break! 🐾🐶
      </h1>
    </div>
  );
};

export default Error;
